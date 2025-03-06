const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Importar rutas y modelos
 const usuarioRoutes = require("./routes/usuarioRoutes");
const aprovechadoresRoutes = require("./routes/aprovechadoresRoutes");
const Aprovechador = require("./models/aprovechador");


// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para recibir datos de formularios

// Verificar si la carpeta de imágenes existe, si no, crearla
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use("/aprovechadores", aprovechadoresRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

// Configuración de `multer` para guardar imágenes en `uploads/`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});
const upload = multer({storage}); // Destino temporal

// Servir archivos estáticos (incluyendo imágenes subidas)
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Nueva línea

// Rutas
app.use("/api/usuarios", usuarioRoutes);
//app.use("/aprovechadores", aprovechadoresRoutes); // Mantén el mismo nombre en frontend y backend

// Ruta para mostrar el login
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Ruta para guardar un aprovechador en la BD (ahora con foto)
app.post("/aprovechadores", upload.single("foto"), async (req, res) => {
    try {
        console.log("📩 Datos recibidos:", req.body);
        console.log("🖼️ Foto recibida:", req.file);

        // Guardar en la base de datos con la ruta de la imagen
        // const nuevoAprovechador = await Aprovechador.guardarAprovechador({
        //     ...req.body,
        //     foto: req.file ? req.file.filename : "" // Guarda el nombre del archivo
        // });
        //const guardarAprovechadores = await Aprovechador.guardarAprovechadores(req.body);
        res.status(201).json({
            mensaje: "✅ Aprovechador guardado correctamente",
            data: guardarAprovechadores,
        });
    } catch (error) {
        console.error("❌ Error al guardar aprovechador:", error);
        res.status(500).json({ mensaje: "Error al guardar el aprovechador" });
    }
});

// Iniciar servidor
// app.listen(PORT, () => {
//     console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
// });
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const bodyParser = require('body-parser');

// const usuarioRoutes = require("./routes/usuarioRoutes");
// const aprovechadoresRoutes = require("./routes/aprovechadoresRoutes");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Configuración de Multer para almacenamiento de imágenes
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// // Rutas
// app.use("/api/usuarios", usuarioRoutes);
// app.use("/aprovechadores", aprovechadoresRoutes);

// app.get("/login", (req, res) => {
//          res.sendFile(path.join(__dirname, "../frontend/login.html"));
//      });

// // Servidor
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
