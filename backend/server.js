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
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
