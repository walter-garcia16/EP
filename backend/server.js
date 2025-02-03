const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const PORT = 3000;
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./models/database');

app.use(cors());
// Middleware para parsear JSON
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
// Servir archivos estáticos (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta para mostrar el login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Ruta para manejar el login (Ejemplo)
// app.post("/api/login", (req, res) => {
//     const { username, password, role } = req.body;

//     // Simulación de autenticación (sustituir por lógica real con BD)
//     if (username === "admin" && password === "1234" && role === "Administrador") {
//         return res.json({ success: true, message: "Inicio de sesión exitoso" });
//     }

//     res.status(401).json({ success: false, message: "Credenciales incorrectas" });
// });

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
