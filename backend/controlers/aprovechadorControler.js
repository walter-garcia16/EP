// const express = require('express');
// const router = express.Router();
// const Aprovechador = require('../models/aprovechador');
// const aprovechadorControler = require('../controlers/aprovechadorControler');

// module.exports = router;
// const db = require('../models/database');
// // Guardar aprovechador
// const guardarAprovechadores = (req, res) => {
//     console.log("Datos recibidos en backend:", req.body);
//     res.send("Datos recibidos en backend");
// };
// exports.guardarAprovechadores = async (req, res) => {

//     try {
//         console.log("Datos recibidos en backend:", req.body);

//         const {
//         contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//         direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//         nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones,
//         } = req.body;

//         const foto = req.file ? req.file.filename : null; // Guarda solo el nombre del archivo

//         // Validación de campos obligatorios
//         if (!contrato || !nombres || !apellidos || !cedula || !telefono || !correo || !fechaNacimiento || !edad ||
//             !direccionEstablecimiento || !tipoVenta || !actividadEconomica || !direccionResidencia || !barrio || !estrato ||
//             !nivelSisben || !valorM2 || !ocupacionEspacioM2 || !valorTotal || !fechaInicio || !fechaFinalizacion || !observaciones) {
//             return res.status(400).json({ mensaje: "Debe completar todos los campos" });
//         }

//         const query = `
//         INSERT INTO aprovechadores (
//             contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//             direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//             nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//         direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//         nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
//     ];
        
//         // Validar si la cédula ya está registrada
//         const [aprovechadorExistente] = await db.execute('SELECT cedula FROM aprovechadores WHERE cedula = ?', [cedula]);

//         if (aprovechadorExistente.length > 0) {
//             return res.status(400).json({ mensaje: "El Aprovechador ya se encuentra registrado" });
//         }
//         await db.query(query, values);
//         console.log("✅ Aprovechador guardado correctamente");
//         res.status(201).json({ mensaje: "Aprovechador creado correctamente" });

//     } catch (error) {
//         console.error("Error al crear aprovechador:", error);
//         res.status(500).json({ error: "Error en el servidor" });
//     }
// };
// //         // Insertar usuario en la base de datos
// //         const resultado = await Aprovechador.guardarAprovechadores({
            
// //         contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
// //         direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
// //         nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
// //         });

// //         if (resultado[0].affectedRows > 0) {
// //             res.status(201).json({ mensaje: "Aprovechador registrado correctamente" });
// //         } else {
// //             res.status(500).json({ mensaje: "Error al registrar Aprovechador" });
// //         }
// //     } catch (error) {
// //         console.error("Error al registrar Aprovechador:", error);
// //         res.status(500).json({ mensaje: "Error al registrar Aprovechador", error: error.message });
// //     }
// // };

// // Listar aprovechadores
// const listarAprovechadores = async (req, res) => {
//     try {
//         const [result] = await Aprovechador.listarAprovechadores();
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error al listar aprovechadores:', error);
//         res.status(500).json({ mensaje: 'Error al listar aprovechadores', error });
//     }
// };

// // Obtener aprovechador por cédula
// const obtenerAprovechadoresPorCedula = async (req, res) => {
//     try {
//         const { cedula } = req.params;
//         const result = await Aprovechador.obtenerAprovechadoresPorCedula(cedula);
//         if (result) {
//             res.status(200).json(result);
//         } else {
//             res.status(404).json({ mensaje: 'Aprovechador no encontrado' });
//         }
//     } catch (error) {
//         console.error('Error al obtener aprovechador:', error);
//         res.status(500).json({ mensaje: 'Error al obtener aprovechador', error });
//     }
// };

// // Actualizar aprovechador
// const actualizarAprovechadores = async (req, res) => {
//     try {
//         const datos = req.body;
//         await Aprovechador.actualizarAprovechadores(datos);
//         res.status(200).json({ mensaje: 'Aprovechador actualizado correctamente' });
//     } catch (error) {
//         console.error('Error al actualizar aprovechador:', error);
//         res.status(500).json({ mensaje: 'Error al actualizar aprovechador', error });
//     }
// };

// // Eliminar aprovechador
// const eliminarAprovechadores = async (req, res) => {
//     try {
//         const { cedula } = req.params;
//         await Aprovechador.eliminarAprovechadores(cedula);
//         res.status(200).json({ mensaje: 'Aprovechador eliminado correctamente' });
//     } catch (error) {
//         console.error('Error al eliminar aprovechador:', error);
//         res.status(500).json({ mensaje: 'Error al eliminar aprovechador', error });
//     }
// };
// module.exports = {
//    // guardarAprovechadores,
//     listarAprovechadores,
//     obtenerAprovechadoresPorCedula,
//     actualizarAprovechadores,
//     eliminarAprovechadores
// };
const Aprovechador = require("../models/aprovechador");

// Guardar aprovechador
const guardarAprovechadores = async (req, res) => {
    try {
        const { contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad, 
            direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, 
            estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, 
            fechaFinalizacion, observaciones } = req.body;

        // Si hay una imagen cargada, guardamos su nombre
        const foto = req.file ? req.file.filename : null;

        const resultado = await Aprovechador.guardarAprovechadores({
            contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
            direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, 
            estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, 
            fechaFinalizacion, observaciones, foto
        });

        res.status(201).json({ mensaje: "Aprovechador guardado correctamente", resultado });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el aprovechador", detalle: error.message });
    }
};

// Listar aprovechadores
const listarAprovechadores = async (req, res) => {
    try {
        const lista = await Aprovechador.listarAprovechadores();
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la lista", detalle: error.message });
    }
};

// Actualizar aprovechador
const actualizarAprovechadores = async (req, res) => {
    try {
        const { cedula } = req.params;
        const datosActualizados = req.body;
        if (req.file) datosActualizados.foto = req.file.filename;

        await Aprovechador.actualizarAprovechadores(cedula, datosActualizados);
        res.status(200).json({ mensaje: "Aprovechador actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar", detalle: error.message });
    }
};

// Eliminar aprovechador
const eliminarAprovechadores = async (req, res) => {
    try {
        const { cedula } = req.params;
        await Aprovechador.eliminarAprovechadores(cedula);
        res.status(200).json({ mensaje: "Aprovechador eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar", detalle: error.message });
    }
};

module.exports = {
    guardarAprovechadores,
    listarAprovechadores,
    actualizarAprovechadores,
    eliminarAprovechadores,
};
