import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ bgColor = "#000000ff" }) => { // valor por defecto
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="header" style={{ backgroundColor: bgColor, color: "white" }}>
      <div className="header-left">
        <span className="sat-title">SUPPORT IT</span>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/" style={{ color: 'white' }}>Inicio</Link></li>
          <li><Link to="/servicios" style={{ color: 'white' }}>Servicios</Link></li>
          <li><Link to="/contacto" style={{ color: 'white' }}>Contacto</Link></li>
        </ul>
      </nav>
      <div className="header-right">
        <button
          className="btn-login"
          onClick={handleLoginClick}
          style={{
            backgroundColor: '#FFD700',
            color: '#004080',
            padding: '8px 16px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
