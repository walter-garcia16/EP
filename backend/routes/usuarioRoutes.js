const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require('multer');
const usuarioControler = require('../controlers/usuarioControler');
const upload = multer({ storage: multer.memoryStorage() });


router.post('/registrar', upload.single('foto'), usuarioControler.registrarUsuario);

module.exports = router;

dotenv.config();

// Configuración de la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "espubli"
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado a la base de datos");
});

// Ruta para el login
router.post("/login", (req, res) => {
    const { username, password, role } = req.body;
    const sql = "SELECT * FROM usuarios WHERE username = ? AND role = ?";
    
    db.query(sql, [username, role], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error en el servidor" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Usuario o rol incorrecto" });
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login exitoso", token });
    });
});

module.exports = router;
