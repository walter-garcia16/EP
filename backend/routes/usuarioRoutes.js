const express = require("express");
const multer = require("multer");
const path = require("path");
const loginControler = require("../controlers/loginControler");
const usuarioControler = require("../controlers/usuarioControler");
const router = express.Router();

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Ruta para registrar usuario con foto
router.post("/registrar", upload.single("foto"), usuarioControler.registrarUsuario);
// Ruta para validar credenciales de usuario
router.post('/login', loginControler.login);
module.exports = router;
