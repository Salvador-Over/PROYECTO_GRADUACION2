import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState(""); // antes username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pg2-backend-1.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando al servidor");
    }
  };

  // --- REGISTRO ---
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pg2-backend-1.onrender.com/register", { // usar /register simple
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Registro exitoso.");
        setIsRegistering(false);
        setNombre("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando al servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isRegistering ? "CREAR CUENTA" : "INICIAR SESIÓN"}</h2>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">{isRegistering ? "Registrarse" : "Iniciar sesión"}</button>
        </form>

        <div className="toggle-section">
          {isRegistering ? (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <button className="toggle-btn" onClick={() => setIsRegistering(false)}>
                Inicia sesión
              </button>
            </p>
          ) : (
            <p>
              ¿No tienes cuenta?{" "}
              <button className="toggle-btn" onClick={() => setIsRegistering(true)}>
                Crear cuenta
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
