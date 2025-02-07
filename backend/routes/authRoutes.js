// // backend/routes/authRoutes.js
// const express = require("express");
// const db = require("../models/database");
// const router = express.Router();

// router.post("/login", async (req, res) => {
//     const { usuario, contraseña, rol } = req.body;
//     try {
//         const [result] = await db.execute(
//             "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ? AND rol = ?",
//             [usuario, contraseña, rol]
//         );
//         if (result.length > 0) {
//             res.json({ success: true, rol: result[0].rol });
//         } else {
//             res.status(401).json({ success: false, mensaje: "Credenciales incorrectas" });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, mensaje: "Error en el servidor" });
//     }
// });

// module.exports = router;
