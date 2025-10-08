/* =========================================================
   HuertoHogar - script.js (versión limpia)
   - Auth local (educativo): localStorage + SHA-256
   - Validación registro / login
   - Estado de sesión en header (#auth-area)
   - Contacto: contador de caracteres
   - Región → Comunas dinámicas (opcional)
   ========================================================= */

/* ------------------------
   Constantes y utilidades
   ------------------------ */
const DOMAIN_RE = /^[A-Za-z0-9._%+-]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/;
const USERS_KEY = "hh_users";
const SESSION_KEY = "hh_auth_user";

/* Storage helpers */
function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}
function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
function setSession(email) { localStorage.setItem(SESSION_KEY, email); }
function getSession() { return localStorage.getItem(SESSION_KEY); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

/* Hash SHA-256 (para guardar/verificar contraseñas) */
async function sha256(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

/* Mostrar texto de error en un <p id="errores..."> si existe */
function showError(el, msg) { if (el) el.textContent = msg || ""; }

/* ------------------------
   Render de sesión en header
   ------------------------ */
function renderAuthArea() {
  const area = document.getElementById("auth-area");
  if (!area) return;

  const sessionEmail = getSession();
  if (!sessionEmail) {
    area.innerHTML = `
      <a href="login.html" style="color:#fff;text-decoration:none;margin-right:10px;">Iniciar sesión</a>
      <a href="registro.html" style="color:#fff;text-decoration:none;">Registrarse</a>
    `;
    return;
  }

  const users = loadUsers();
  const user = users.find(u => u.email === sessionEmail);
  const nombre = (user?.nombre || sessionEmail).split(" ")[0];

  area.innerHTML = `
    <span style="margin-right:10px;">👋 Hola, ${nombre}</span>
    <button id="logout-btn" style="background:#fff;color:#2E8B57;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;">
      Cerrar sesión
    </button>
  `;
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    clearSession();
    location.href = "index.html";
  });
}

/* ------------------------
   Contacto: contador de caracteres
   ------------------------ */
function initContactoCounter() {
  const txt = document.getElementById("comentario");
  const counter = document.getElementById("contador-comentario");
  if (!txt || !counter) return;
  const update = () => counter.textContent = `${txt.value.length} / 500`;
  txt.addEventListener("input", update);
  update();
}

/* ------------------------
   Registro
   ------------------------ */
function initRegistro() {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const email = document.getElementById("email")?.value.trim().toLowerCase();
    const emailConfirmEl = document.getElementById("emailConfirm");
    const emailConfirm = emailConfirmEl ? emailConfirmEl.value.trim().toLowerCase() : undefined;
    const pass = document.getElementById("password")?.value || "";
    const confirmar = document.getElementById("confirmar")?.value || "";
    const telefono = document.getElementById("telefono")?.value || "";
    const msg = document.getElementById("erroresRegistro");

    const errores = [];
    if (!nombre || nombre.length > 100) errores.push("El nombre es requerido y máx. 100 caracteres");
    if (!email || email.length > 100 || !DOMAIN_RE.test(email)) errores.push("Correo inválido (debe ser @duocuc.cl, profesor.duoc.cl o gmail.com)");
    if (typeof emailConfirm !== "undefined" && email !== emailConfirm) errores.push("Los correos no coinciden");
    if (pass.length < 4 || pass.length > 10) errores.push("La contraseña debe tener entre 4 y 10 caracteres");
    if (pass !== confirmar) errores.push("Las contraseñas no coinciden");
    if (telefono && telefono.length > 20) errores.push("Teléfono: máx. 20 caracteres");

    const users = loadUsers();
    if (users.some(u => u.email === email)) errores.push("Este correo ya está registrado");

    if (errores.length) { showError(msg, errores.join(". ")); return; }
    showError(msg, "");

    const passHash = await sha256(pass);
    users.push({ nombre, email, passHash });
    saveUsers(users);
    setSession(email);                 // auto-login
    location.href = "index.html";      // redirigir donde prefieras
  });
}

/* ------------------------
   Login
   ------------------------ */
function initLogin() {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email")?.value.trim().toLowerCase();
    const pass = document.getElementById("login-pass")?.value || "";
    const msg = document.getElementById("erroresLogin");

    const errores = [];
    if (!email || email.length > 100 || !DOMAIN_RE.test(email)) errores.push("Correo inválido (debe ser @duocuc.cl, profesor.duoc.cl o gmail.com)");
    if (pass.length < 4 || pass.length > 10) errores.push("La contraseña debe tener entre 4 y 10 caracteres");
    if (errores.length) { showError(msg, errores.join(". ")); return; }
    showError(msg, "");

    const users = loadUsers();
    const user = users.find(u => u.email === email);
    const passHash = await sha256(pass);

    if (!user || user.passHash !== passHash) {
      showError(msg, "Correo o contraseña incorrectos.");
      return;
    }

    setSession(email);
    location.href = "index.html";
  });
}

/* ------------------------
   Guard (usar en páginas privadas)
   ------------------------ */
// Llama a authGuard() al inicio de la página que quieras proteger.
// function authGuard() {
//   if (!getSession()) location.href = "login.html";
// }

/* ------------------------
   Región → Comunas dinámicas (opcional)
   ------------------------ */
const REGIONES_COMUNAS = {
  "Región Metropolitana de Santiago": ["Santiago", "Maipú", "La Florida", "Ñuñoa", "Puente Alto"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Hualpén", "San Pedro de la Paz"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Coihueco"],
  "Región de Atacama": ["Copiapó", "Vallenar", "Caldera"]
};

function initRegionesComunas() {
  const selRegion = document.getElementById("region");
  const selComuna = document.getElementById("comuna");
  if (!selRegion || !selComuna) return;

  function fillComunas(region) {
    const comunas = REGIONES_COMUNAS[region] || [];
    selComuna.innerHTML = `<option value="">— Seleccione la comuna —</option>` +
      comunas.map(c => `<option>${c}</option>`).join("");
  }

  selRegion.addEventListener("change", () => fillComunas(selRegion.value));
  // Si ya hay región seleccionada al cargar:
  if (selRegion.value) fillComunas(selRegion.value);
}

/* ------------------------
   Init
   ------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  renderAuthArea();
  initContactoCounter();
  initRegistro();
  initLogin();
  initRegionesComunas();
  // authGuard(); // <- activa aquí en páginas privadas si lo necesitas
});
