const Usuario = require('../models/usuario');
const db = require('../models/database');

exports.registrarUsuario = async (req, res) => {
    try {
        console.log("Datos recibidos en backend:", req.body); // Se verifica los datos recibidos

        const {
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo,
            direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval
        } = req.body; 

        // Validar que no haya campos vacíos
        if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo || 
            !direccion || !barrio || !municipio || !fechaIngreso || !fechaFinalizacion || !formacion || !aval) {
            return res.status(400).json({ mensaje: "Debe completar todos los campos" });
        }
        const [usuarioExistente] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);

        if (usuarioExistente.length > 0) {
            return res.status(400).json({ mensaje: "El usuario ya se encuentra registrado" });
        }
        // Insertar usuario
        const resultado = await Usuario.crearUsuario(req.body);

        if (resultado[0].affectedRows > 0) {
            res.status(201).json({ mensaje: "Usuario registrado correctamente" });
        } else {
            res.status(500).json({ mensaje: "Error al registrar usuario" });
        }
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
    }
};
