import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import Dashboard from "./Componentes/Dashboard/Dashboard";
import Usuarios from "./Componentes/Usuarios/Usuarios";
import About from "./Componentes/Nosotros/Nosotros";
import RegistrarServicio from "./Componentes/Servicios/RegistrarServicio";
import Productos from "./Componentes/Productos/Productos";
import Principal from "./Componentes/Principal/Principal";
import Contacto from "./Componentes/Nosotros/Nosotros";


import Servicios from "./Componentes/PagServicios/Servicios";


function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!storedUser;

  const PrivateRoute = ({ element }) => (isAuthenticated ? element : <Navigate to="/login" />);
  const AdminRoute = ({ element }) =>
    isAuthenticated && storedUser?.rol === "admin" ? element : <Navigate to="/login" />;

  return (
    <Routes>
      {/* Página principal: primera que se ve */}
      <Route
        path="/"
        element={<Principal />}
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Productos */}
      <Route
        path="/productos"
        element={
          isAuthenticated &&
          (storedUser?.rol === "admin" || storedUser?.rol === "usuario") ? (
            <Productos />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Registrar Servicio */}
      <Route
        path="/registrar-servicio"
        element={
          isAuthenticated &&
          (storedUser?.rol === "empleado" || storedUser?.rol === "admin") ? (
            <RegistrarServicio />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Usuarios (solo admin) */}
      <Route path="/usuarios" element={<AdminRoute element={<Usuarios />} />} />

      {/* Nosotros */}
      <Route path="/about" element={<About />} />

      {/* 404 */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

<Route path="/contacto" element={<Contacto />} />
<Route path="/servicios" element={<Servicios />} />

      
    </Routes>
  );
}

export default App;
