import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

// Expresión regular para validar correos permitidos
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@((profesor\.)?duocuc\.cl|(profesor\.)?duoc\.cl|gmail\.com)$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.title = "Iniciar sesión - HuertoHogar";
  }, []);

  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  // Estado para mensajes de error o éxito
  const [errorMsg, setErrorMsg] = useState(""); 
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = formRef.current;
    if (!formEl) return;

    setErrorMsg("");
    setSuccessMsg("");

    const emailOK = EMAIL_RE.test(email);
    const passOK = pass.length >= 4 && pass.length <= 10;

    if (!formEl.checkValidity() || !emailOK || !passOK) {
      if (!emailOK && emailRef.current) {
        emailRef.current.setCustomValidity(
          "El correo debe pertenecer a duoc.cl, duocuc.cl, profesor.duoc.cl, profesor.duocuc.cl o gmail.com"
        );
      }
      if (!passOK) {
        setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
      }
      formEl.reportValidity();
      return;
    }

    try {
      
      login(email); 
      
      setSuccessMsg("Inicio de sesión exitoso. Redirigiendo..."); 
      
      setTimeout(() => {
        navigate("/"); 
      }, 1000);

    } catch (err) {
      setErrorMsg("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    
    <div className="page-container">
      {}

      {}
      <main className="auth-main-content">
        
        {/* La tarjeta blanca del formulario */}
        <div className="auth-card">
          <h2>Iniciar sesión</h2>

          {/* Mensaje de éxito */}
          {successMsg && (
            <p className="success-message" style={{ textAlign: "center", color: "#4aa056", marginTop: 6, fontWeight: 600 }}>
              {successMsg}
            </p>
          )}

          <form id="formLogin" ref={formRef} noValidate onSubmit={handleSubmit}>
            
            {/* Campo Correo */}
            <label htmlFor="login-email">Correo*</label>
            <input
              id="login-email"
              ref={emailRef}
              type="email"
              required
              maxLength={100}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailRef.current) emailRef.current.setCustomValidity("");
              }}
              placeholder="Correo"
            />

            {/* Campo Contraseña */}
            <label htmlFor="login-pass">Contraseña*</label>
            <input
              id="login-pass"
              ref={passRef}
              type="password"
              required
              minLength={4}
              maxLength={10}
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            {}
            <button type="submit">Entrar</button>
          </form>

          {/* Mensaje de error */}
          {errorMsg && (
            <p className="errores" style={{ color: 'red', marginTop: '15px' }}>
              {errorMsg}
            </p>
          )}

          <p className="link-registro">
            ¿No tienes cuenta? <Link to="/registro">Crea una aquí</Link>
          </p>
        </div>
      </main>
      
      {}
    </div>
  );
}