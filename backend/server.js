const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Importar rutas y modelos
const usuarioRoutes = require("./routes/usuarioRoutes");
const aprovechadorRoutes = require("./routes/aprovechadoresRoutes"); // Asegúrate de que el nombre del archivo coincida
const Aprovechador = require("./models/aprovechador"); // IMPORTAR MODELO CORRECTO

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/aprovechadores", aprovechadorRoutes); // Mantén el mismo nombre en frontend y backend

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta para mostrar el login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Ruta para guardar un aprovechador en la BD
app.post("/aprovechadores", async (req, res) => {
    try {
        console.log("📩 Datos recibidos:", req.body); // Verificación

        // Guardar en la base de datos
        const nuevoAprovechador = await Aprovechador.create(req.body);

        res.status(201).json({
            mensaje: "✅ Aprovechador guardado correctamente",
            data: nuevoAprovechador,
        });
    } catch (error) {
        console.error("❌ Error al guardar aprovechador:", error);
        res.status(500).json({ mensaje: "Error al guardar el aprovechador" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

