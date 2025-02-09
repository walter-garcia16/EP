//controllers/aprovechadorController.js
const express = require('express');
const router = express.Router();
const db = require('../models/database');

module.exports = router;
exports.crearAprovechador = async (req, res) => {
    try {
        const {
            contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
            direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, 
            barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, 
            observaciones
        } = req.body;

        // Validar datos
        if (!contrato || !nombres || !cedula || !telefono) {
            console.error("❌ Faltan datos obligatorios");
            return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });
        }

        const query = `
            INSERT INTO aprovechadores (
                contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
                direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia,
                barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, 
                observaciones
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
            direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia,
            barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, 
            observaciones
        ];

        await db.query(query, values);
        console.log("✅ Aprovechador guardado correctamente");
        res.status(201).json({ mensaje: "Aprovechador creado correctamente" });

    } catch (error) {
        console.error("Error al crear aprovechador:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};


// Listar todos los aprovechadores
exports.listarAprovechadores = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM aprovechadores');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener aprovechadores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Actualizar un aprovechador
exports.actualizarAprovechador = async (req, res) => {
    try {
        const { contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad, direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones } = req.body;
        
        const [resultado] = await db.query(`UPDATE aprovechadores SET contrato=?, nombres=?, apellidos=?, telefono=?, correo=?, fechaNacimiento=?, edad=?, direccionEstablecimiento=?, tipoVenta=?, actividadEconomica=?, direccionResidencia=?, barrio=?, estrato=?, nivelSisben=?, valorM2=?, ocupacionEspacioM2=?, valorTotal=?, fechaInicio=?, fechaFinalizacion=?, observaciones=? WHERE cedula=?`,
            [contrato, nombres, apellidos, telefono, correo, fechaNacimiento, edad, direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, cedula]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Aprovechador no encontrado' });
        }

        res.json({ mensaje: 'Aprovechador actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar aprovechador:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Eliminar un aprovechador
exports.eliminarAprovechador = async (req, res) => {
    try {
        const { cedula } = req.params;
        const [resultado] = await db.query('DELETE FROM aprovechadores WHERE cedula = ?', [cedula]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Aprovechador no encontrado' });
        }

        res.json({ mensaje: 'Aprovechador eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar aprovechador:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Buscar aprovechadores por cédula, contrato o nombre
exports.buscarAprovechadores = async (req, res) => {
    try {
        const { query } = req.params;
        const [rows] = await db.query(`SELECT * FROM aprovechadores WHERE cedula LIKE ? OR contrato LIKE ? OR nombre LIKE ?`,
            [`%${query}%`, `%${query}%`, `%${query}%`]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error al buscar aprovechadores:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
