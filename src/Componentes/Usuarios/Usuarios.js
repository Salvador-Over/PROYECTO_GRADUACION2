import React, { useEffect, useState } from "react";
import axios from "axios";
import './Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "", rol: "usuario" });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.rol !== "admin") return;
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar usuarios");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data.message);
      fetchUsuarios();
      setFormData({ nombre: "", email: "", password: "", rol: "usuario" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al crear usuario");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      alert("Usuario eliminado");
      fetchUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  if (!user || user.rol !== "admin") return <h2>No tienes permisos</h2>;

  return (
    <div className="usuarios-container">
      <h1>Usuarios</h1>
      <form className="usuarios-form" onSubmit={handleCrear}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="usuario">Usuario</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Crear Usuario</button>
      </form>

      <table className="usuarios-table">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td><button onClick={() => handleEliminar(u.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
