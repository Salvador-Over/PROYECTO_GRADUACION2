import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // Guardamos el usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirigimos al dashboard
        navigate("/dashboard");
      } else {
        alert(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      alert("Error conectando al servidor");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>INICIAR SESIÓN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaEnvelope className="icon"/>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon"/>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Get Started</button>
        </form>

        <div className="social-login">
          <div className="social-icons">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
