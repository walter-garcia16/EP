const express = require("express");
const multer = require("multer");
const path = require("path");
const Usuario = require("../models/usuario");

const router = express.Router();

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Carpeta donde se guardarán las fotos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único
    }
});

const upload = multer({ storage: storage });

// Ruta para registrar usuario con foto
router.post("/registrar", upload.single("foto"), async (req, res) => {
    try {
        const { nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones } = req.body;
        const foto = req.file ? req.file.filename : null; // 📷 Guardar el nombre de la foto

        console.log("Recibido:", req.body, "Foto:", foto);

        // Guardar en base de datos
        await Usuario.crearUsuario({
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, foto
        });

        res.status(201).json({ mensaje: "Usuario registrado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al registrar usuario." });
    }
});

module.exports = router;
