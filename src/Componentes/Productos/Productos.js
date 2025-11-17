import React, { useState, useEffect } from "react";
import "./Productos.css"; 
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
  const [editingId, setEditingId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Cargar productos
  const fetchProductos = async () => {
    try {
      const res = await fetch("https://pg2-backend-1.onrender.com/productos");
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchProductos();
  }, [navigate, user]);

  // Cambios en formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`https://pg2-backend-1.onrender.com/productos/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("https://pg2-backend-1.onrender.com/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
      setEditingId(null);
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  // Editar producto
  const handleEdit = (producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen: producto.imagen || ""
    });
    setEditingId(producto.id);
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`https://pg2-backend-1.onrender.com/productos/${id}`, { method: "DELETE" });
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="productos-container">
      <h2>📦 Productos</h2>

      {/* Formulario solo para admin */}
      {user.rol === "admin" && (
        <form onSubmit={handleSubmit} className="producto-form">
          <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
          <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
          <input type="text" name="imagen" placeholder="URL de la imagen" value={formData.imagen} onChange={handleChange} required />
          <button type="submit">{editingId ? "Actualizar" : "Agregar"} Producto</button>
        </form>
      )}

      {/* Grid de productos */}
      <div className="productos-grid">
        {productos.map((p) => (
          <div className="producto-card" key={p.id}>
            <img
              src={p.imagen || "https://via.placeholder.com/150"}
              alt={p.nombre}
              className="producto-imagen"
            />
            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p className="precio">Q{p.precio}</p>
            <p className="stock">Stock: {p.stock}</p>
            <div className="acciones">
              {user.rol === "admin" ? (
                <>
                  <button onClick={() => handleEdit(p)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
                </>
              ) : (
                <a
                  href={`https://wa.me/50250115060?text=Hola,%20quiero%20información%20sobre%20el%20producto:%20${encodeURIComponent(p.nombre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Consultar WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
