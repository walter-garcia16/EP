// const Usuario = require('../models/usuario');
// const db = require('../models/database');

// exports.registrarUsuario = async (req, res) => {
//     try {
//         const { cedula } = req.body;
//         const foto = req.file ? req.file.buffer : null; // Capturar la foto
        
// // //         // Verificar si la cédula ya existe
// // //         const [existe] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);
// // //         if (existe.length > 0) {
// // //             return res.status(400).json({ mensaje: 'Este usuario ya se encuentra registrado, espere las credenciales de su administrador' });
// // //         }

// //         // Guardar en la base de datos
// //         await Usuario.crearUsuario(req.body, foto);
// //         res.status(201).json({ mensaje: 'Datos guardados con éxito' });

// //     } catch (error) {
// //         console.error('Error al registrar usuario:', error);
// //         res.status(500).json({ mensaje: 'Error al registrar usuario', error });
// //     }
// // };
// // Verificar si la cédula ya existe
// const [existe] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);
// if (existe.length > 0) {
//     return res.status(400).json({ mensaje: 'Este usuario ya se encuentra registrado, espere las credenciales de su administrador' });
// }

// const resultado = await Usuario.crearUsuario(req.body);

// if (resultado.affectedRows > 0) {
//     res.status(201).json({ mensaje: 'Datos guardados exitosamente, por favor espera que el administrador se comunique con usted' });
// } else {
//     res.status(500).json({ mensaje: 'Error al guardar los datos, intenta de nuevo' });
// }
// } catch (error) {
//     console.error("Error al registrar usuario:", error);
// res.status(500).json({ mensaje: 'Error al registrar usuario', error });
// }
// };
// const Usuario = require('../models/usuario');
// const db = require('../models/database');

// exports.registrarUsuario = async (req, res) => {
//     try {
//         const { nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, formacion, aval, observaciones, fechaIngreso, fechaFinalizacion } = req.body;

//         // Verificar si algún campo obligatorio está vacío o undefined
//         if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo || !direccion || !barrio || !municipio || !formacion || !aval || !fechaIngreso || !fechaFinalizacion) {
//             return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
//         }

//         // Verificar si la cédula ya existe
//         const [existe] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);
//         if (existe.length > 0) {
//             return res.status(400).json({ mensaje: 'Este usuario ya se encuentra registrado, espere las credenciales de su administrador' });
//         }

//         // Insertar usuario en la base de datos
//         const resultado = await Usuario.crearUsuario(req.body);
        
//         if (resultado.affectedRows > 0) {
//             res.status(201).json({ mensaje: 'Datos guardados exitosamente, por favor espera que el administrador se comunique con usted' });
//         } else {
//             res.status(500).json({ mensaje: 'Error al guardar los datos, intenta de nuevo' });
//         }
//     } catch (error) {
//         console.error("Error al insertar usuario:", error);
//         res.status(500).json({ mensaje: 'Error al registrar usuario', error });
//     }
// };
// const Usuario = require('../models/usuario');
// const db = require('../models/database');

// exports.registrarUsuario = async (req, res) => {
//     try {
//         const { nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, formacion, aval, observaciones, fechaIngreso, fechaFinalizacion } = req.body;

//         // Verificar si algún campo obligatorio está vacío o undefined
//         if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo || !direccion || !barrio || !municipio || !formacion || !aval || !fechaIngreso || !fechaFinalizacion) {
//             return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
//         }

//         // Verificar si la cédula ya existe
//         const [existe] = await db.execute('SELECT * FROM caracusuarios WHERE cedula = ?', [cedula]);
//         if (existe.length > 0) {
//             return res.status(400).json({ mensaje: 'Este usuario ya se encuentra registrado, espere las credenciales de su administrador' });
//         }

//         // Insertar usuario en la base de datos
//         const resultado = await Usuario.crearUsuario(req.body);
        
//         if (resultado.affectedRows > 0) {
//             res.status(201).json({ mensaje: 'Datos guardados exitosamente, por favor espera que el administrador se comunique con usted' });
//         } else {
//             res.status(500).json({ mensaje: 'Error al guardar los datos, intenta de nuevo' });
//         }
//     } catch (error) {
//         console.error("Error al insertar usuario:", error);
//         res.status(500).json({ mensaje: 'Error al registrar usuario', error });
//     }
// };
const Usuario = require('../models/usuario');
const db = require('../models/database');
exports.registrarUsuario = async (req, res) => {
    try {
        console.log("Datos recibidos en backend:", req.body); // 🔍 Verifica datos en consola

        const {
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo,
            direccion, barrio, municipio,fechaInicio, fechaFinal, formacion, aval, observaciones, 
        } = req.body;

        // Validar que no haya valores undefined!
         if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo || !direccion || !barrio || !municipio || !fechaInicio || !fechaFinal || !formacion || !aval || !observaciones) {
            return res.status(400).json({ mensaje: "Debe completar todos los campos" });
         }

        // Intentar insertar usuario
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
