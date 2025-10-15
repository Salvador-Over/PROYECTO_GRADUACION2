const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Railway
const dbConfig = {
  host: "ballast.proxy.rlwy.net",
  user: "root",
  password: "FPpnyoACidbkCDXFTLdRnEatJiiGUkcx",
  database: "railway",
  port: 46410,
  ssl: { rejectUnauthorized: false } // para desarrollo local
};

// Crear pool
const pool = mysql.createPool({ ...dbConfig, connectionLimit: 10 });

// Verificar conexión
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    console.log("✅ Conexión a Railway MySQL OK");
    conn.release();
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  }
})();

// ---------------- LOGIN ----------------

// Registro
app.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const [existing] = await pool.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (existing.length) return res.status(400).json({ message: "Usuario ya existe" });

    await pool.query("INSERT INTO usuarios (nombre,email,password) VALUES (?,?,?)", [nombre,email,password]);
    res.json({ message: "Usuario registrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      "SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );
    if (!rows.length) return res.status(400).json({ message: "Email o contraseña incorrectos" });

    res.json({ message: "Login exitoso", user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// ---------------- EQUIPOS ----------------

// Crear equipo
app.post("/equipos", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await pool.query("INSERT INTO equipos (nombre, descripcion) VALUES (?,?)", [nombre, descripcion]);
    res.json({ message: "Equipo creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Listar equipos
app.get("/equipos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM equipos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// ---------------- SERVICIOS ----------------

// Crear servicio
app.post("/servicios", async (req, res) => {
  const { id_equipo, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

  if (!id_equipo || !descripcion) {
    return res.status(400).json({ message: "Equipo y descripción son requeridos" });
  }

  try {
    await pool.query(
      "INSERT INTO servicios (id_equipo, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?,?,?,?,?)",
      [id_equipo, descripcion, fecha_inicio, fecha_fin, estado || "Pendiente"]
    );
    res.json({ message: "Servicio creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Listar servicios con nombre de equipo
app.get("/servicios", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.descripcion, s.fecha_inicio, s.fecha_fin, s.estado, e.nombre AS equipo
       FROM servicios s
       JOIN equipos e ON s.id_equipo = e.id`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// ---------------- USUARIOS ----------------

// Listar usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre, email, rol FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar usuario
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- INICIO ----------------

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// ---------------- INICIO DEL SERVIDOR ----------------

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

// Listar productos
app.get("/productos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Crear producto (solo admin)
app.post("/productos", async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen } = req.body;
  try {
    await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?,?,?,?,?)",
      [nombre, descripcion, precio, stock, imagen]
    );
    res.json({ message: "Producto creado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Actualizar producto (solo admin)
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    await pool.query(
      "UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=? WHERE id=?",
      [nombre, descripcion, precio, stock, id]
    );
    res.json({ message: "Producto actualizado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Eliminar producto (solo admin)
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM productos WHERE id=?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
});
