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
