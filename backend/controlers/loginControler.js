const db = require('../models/database');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        console.log("🟢 Datos recibidos en backend:", { username, password });

        // Buscar usuario en la base de datos
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [username]);

        if (rows.length === 0) {
            console.log("🔴 Usuario no encontrado");
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        const usuario = rows[0];

        console.log("🟡 Usuario encontrado en la BD:", usuario);

        // Comparar contraseñas
        if (password !== usuario.contraseña) {
            
            console.log("🔴 Contraseña incorrecta");
            return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        console.log("✅ Inicio de sesión exitoso:", { username, rol: usuario.rol });

        // Retornar éxito
         res.json({
             mensaje: "Inicio de sesión exitoso",
             rol: usuario.rol
         });

    } catch (error) {
        console.error("🛑 Error en autenticación:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
