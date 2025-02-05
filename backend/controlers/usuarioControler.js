const Usuario = require('../models/usuario');
const db = require('../models/database');

exports.registrarUsuario = async (req, res) => {
    try {
        console.log("Datos recibidos en backend:", req.body);

        const {
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo,
            direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones
        } = req.body;

        const foto = req.file ? req.file.filename : null; // Guarda solo el nombre del archivo

        // Validación de campos obligatorios
        if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo ||
            !direccion || !barrio || !municipio || !fechaIngreso || !fechaFinalizacion || !formacion || !aval) {
            return res.status(400).json({ mensaje: "Debe completar todos los campos" });
        }

        // Validar si la cédula ya está registrada
        const [usuarioExistente] = await db.execute('SELECT cedula FROM caracusuarios WHERE cedula = ?', [cedula]);

        if (usuarioExistente.length > 0) {
            return res.status(400).json({ mensaje: "El usuario ya se encuentra registrado" });
        }

        // Insertar usuario en la base de datos
        const resultado = await Usuario.crearUsuario({
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo,
            direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, foto
        });

        if (resultado[0].affectedRows > 0) {
            res.status(201).json({ mensaje: "Usuario registrado correctamente" });
        } else {
            res.status(500).json({ mensaje: "Error al registrar usuario" });
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", error: error.message });
    }
};
