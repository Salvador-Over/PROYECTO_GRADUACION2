import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import RegistrarUsuario from "../Usuarios/Usuarios";
import RegistrarServicio from "../Servicios/RegistrarServicio";
import Productos from "../Productos/Productos";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("Dashboard"); // sección activa

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else setUser(storedUser);
  }, [navigate]);

  if (!user) return <div>Cargando...</div>;

  // Configuración del menú según rol
  const menuItems = user.rol === "admin"
    ? ["Usuarios", "Dashboard", "Productos", "Registrar Servicio"]
    : user.rol === "empleado"
    ? ["Productos", "Registrar Servicio"]
    : ["Productos"];

  const panelTitle = user.rol === "admin" ? "Admin Panel" : "User Panel";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Render dinámico del contenido
  const renderSection = () => {
    switch (activeSection) {
      case "Usuarios":
        return <RegistrarUsuario />;
      case "Registrar Servicio":
        return <RegistrarServicio />;
      case "Productos":
        return <Productos />;
      default:
        return <h2>Bienvenido al {panelTitle}</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header"><h2>{panelTitle}</h2></div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={activeSection === item ? "active" : ""}
              onClick={() => setActiveSection(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="sidebar-logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header"><h1>{activeSection}</h1></div>
        <div className="form-container">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
