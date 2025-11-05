import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const EMAIL_RE =
  /^[A-Za-z0-9._%+-]+@((profesor\.)?duocuc\.cl|(profesor\.)?duoc\.cl|gmail\.com)$/;

export default function Registro() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  useEffect(() => {
    document.title = "Registro — HuertoHogar";

    if (
      typeof window !== "undefined" &&
      typeof (window as any).renderAuthArea === "function"
    ) {
      (window as any).renderAuthArea();
    }
    if (
      typeof window !== "undefined" &&
      typeof (window as any).updateCartBadge === "function"
    ) {
      (window as any).updateCartBadge();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = formRef.current;
    if (!formEl) return;

    setErrorMsg("");
    setSuccessMsg("");
    if (emailRef.current) emailRef.current.setCustomValidity("");

    const emailOK = EMAIL_RE.test(email);
    const emailsIguales = email.trim() === emailConfirm.trim();
    const passOK = password.length >= 4 && password.length <= 10;
    const passIguales = password === confirmar;

    let mensaje = "";

    if (!emailOK) {
      mensaje =
        "El correo debe pertenecer a duoc.cl, duocuc.cl, profesor.duoc.cl, profesor.duocuc.cl o gmail.com.";
      if (emailRef.current) {
        emailRef.current.setCustomValidity(mensaje);
      }
    } else if (!emailsIguales) {
      mensaje = "Los correos no coinciden.";
    } else if (!passOK) {
      mensaje = "La contraseña debe tener entre 4 y 10 caracteres.";
    } else if (!passIguales) {
      mensaje = "Las contraseñas no coinciden.";
    }

    if (!formEl.checkValidity() || !emailOK || !emailsIguales || !passOK || !passIguales) {
      setErrorMsg(mensaje || "Revisa los campos resaltados.");
      formEl.reportValidity();
      return;
    }

    setSuccessMsg("✅ Registro exitoso");

    setNombre("");
    setEmail("");
    setEmailConfirm("");
    setPassword("");
    setConfirmar("");
  };

  return (
    <div className="page-container">
      <main className="auth-main-content">
        <div className="auth-card">
          <h2>Registro de usuario</h2>

          {successMsg && (
            <p className="success-message">{successMsg}</p>
          )}

          <form id="formRegistro" ref={formRef} noValidate onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre completo*</label>
            <input
              id="nombre"
              type="text"
              required
              maxLength={100}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Ana Pérez"
            />

            <label htmlFor="email">Correo*</label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              required
              maxLength={100}
              placeholder="usuario@duoc.cl / profesor.duoc.cl / duocuc.cl / gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailRef.current) emailRef.current.setCustomValidity("");
              }}
            />

            <label htmlFor="emailConfirm">Confirmar correo*</label>
            <input
              id="emailConfirm"
              type="email"
              required
              maxLength={100}
              placeholder="Repite tu correo"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
            />

            <label htmlFor="password">Contraseña*</label>
            <input
              id="password"
              type="password"
              required
              minLength={4}
              maxLength={10}
              placeholder="4 a 10 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmar">Confirmar contraseña*</label>
            <input
              id="confirmar"
              type="password"
              required
              minLength={4}
              maxLength={10}
              placeholder="Repite la contraseña"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Registrar
            </button>
          </form>

          {errorMsg && <p className="errores">{errorMsg}</p>}

          <p className="link-registro">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
