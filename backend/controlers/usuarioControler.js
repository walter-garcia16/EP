const Usuario = require('../models/usuario');
const db = require('../models/database');

exports.registrarUsuario = async (req, res) => {
    try {
        const { cedula } = req.body;
        const foto = req.file ? req.file.buffer : null; // Capturar la foto
        
        // Verificar si la cédula ya existe
        const [existe] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: 'Este usuario ya se encuentra registrado, espere las credenciales de su administrador' });
        }

        // Guardar en la base de datos
        await Usuario.crearUsuario(req.body, foto);
        res.status(201).json({ mensaje: 'Datos guardados con éxito' });

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ mensaje: 'Error al registrar usuario', error });
    }
};
