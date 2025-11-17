import React, { useState, useEffect } from "react";
import "../Servicios/RegistrarServicio.css";

const RegistrarServicio = () => {
  const [equipos, setEquipos] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [formServicio, setFormServicio] = useState({
    id_equipo: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: "Pendiente",
  });

  const [formEquipo, setFormEquipo] = useState({
    nombre: "",
    tipo: "",
  });

  // 🔹 Cargar equipos
  useEffect(() => {
    fetch("https://pg2-backend-1.onrender.com/equipos")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
      .catch((err) => console.error("Error cargando equipos:", err));
  }, []);

  // 🔹 Cargar servicios
  const cargarServicios = () => {
    fetch("https://pg2-backend-1.onrender.com/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // 🔹 Formularios
  const handleChangeServicio = (e) => {
    setFormServicio({ ...formServicio, [e.target.name]: e.target.value });
  };

  const handleChangeEquipo = (e) => {
    setFormEquipo({ ...formEquipo, [e.target.name]: e.target.value });
  };

  // 🔹 Submit Servicio
  const handleSubmitServicio = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://pg2-backend-1.onrender.com/servicios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formServicio),
      });
      if (res.ok) {
        alert("✅ Servicio registrado correctamente");
        setFormServicio({
          id_equipo: "",
          descripcion: "",
          fecha_inicio: "",
          fecha_fin: "",
          estado: "Pendiente",
        });
        cargarServicios();
      } else alert("❌ Error al registrar el servicio");
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };

  // 🔹 Submit Equipo
  const handleSubmitEquipo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://pg2-backend-1.onrender.com/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formEquipo),
      });
      if (res.ok) {
        alert("✅ Equipo registrado correctamente");
        setFormEquipo({ nombre: "", tipo: "" });
        // recarga equipos para el select de servicios
        fetch("https://pg2-backend-1.onrender.com/equipos")
          .then((res) => res.json())
          .then((data) => setEquipos(data));
      } else alert("❌ Error al registrar el equipo");
    } catch (error) {
      console.error(error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="servicio-container">
      <div className="forms-row">
        {/* Formulario Registrar Servicio */}
        <div className="servicio-card">
          <h2>📋 Registrar Servicio</h2>
          <form onSubmit={handleSubmitServicio} className="servicio-form">
            <div className="form-row">
              <div className="form-group">
                <label>Equipo Asignado</label>
                <select
                  name="id_equipo"
                  value={formServicio.id_equipo}
                  onChange={handleChangeServicio}
                  required
                >
                  <option value="">Seleccione un equipo</option>
                  {equipos.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  value={formServicio.estado}
                  onChange={handleChangeServicio}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={formServicio.fecha_inicio}
                  onChange={handleChangeServicio}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha Fin</label>
                <input
                  type="date"
                  name="fecha_fin"
                  value={formServicio.fecha_fin}
                  onChange={handleChangeServicio}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: "1 1 100%" }}>
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formServicio.descripcion}
                  onChange={handleChangeServicio}
                  placeholder="Describe el servicio"
                  rows={3}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-registrar">
              💾 Registrar Servicio
            </button>
          </form>
        </div>

        {/* Formulario Registrar Equipo */}
        <div className="servicio-card">
          <h2>🖥️ Registrar Equipo</h2>
          <form onSubmit={handleSubmitEquipo} className="servicio-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre del Equipo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formEquipo.nombre}
                  onChange={handleChangeEquipo}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Equipo</label>
                <input
                  type="text"
                  name="tipo"
                  value={formEquipo.tipo}
                  onChange={handleChangeEquipo}
                  placeholder="Ej: Laptop, PC, Impresora"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-registrar">
              💾 Registrar Equipo
            </button>
          </form>
        </div>
      </div>

      {/* DataGrid */}
      <div className="servicio-datagrid">
        <h3>Servicios Activos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Equipo</th>
              <th>Descripción</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
<td>{s.equipo}</td>
                <td>{s.descripcion}</td>
              <td>{new Date(s.fecha_inicio).toLocaleDateString("es-ES")}</td>
<td>{s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString("es-ES") : "—"}</td>

                <td>
  <select
    value={s.estado}
    onChange={(e) => actualizarEstado(s.id, e.target.value)}
  >
    <option value="Pendiente">Pendiente</option>
    <option value="En Proceso">En Proceso</option>
    <option value="Finalizado">Finalizado</option>
  </select>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrarServicio;
