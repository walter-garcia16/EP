const db = require('./database');

const Aprovechador = {
    create: async (aprovechador) => {
        const sql = `INSERT INTO aprovechadores (contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad, direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            aprovechador.contrato,
            aprovechador.nombres,
            aprovechador.apellidos,
            aprovechador.cedula,
            aprovechador.telefono,
            aprovechador.correo,
            aprovechador.fechaNacimiento,
            aprovechador.edad,
            aprovechador.direccionEstablecimiento,
            aprovechador.tipoVenta,
            aprovechador.actividadEconomica,
            aprovechador.direccionResidencia,
            aprovechador.barrio,
            aprovechador.estrato,
            aprovechador.nivelSisben,
            aprovechador.valorM2,
            aprovechador.ocupacionEspacioM2,
            aprovechador.valorTotal,
            aprovechador.fechaInicio,
            aprovechador.fechaFinalizacion,
            aprovechador.observaciones
        ];
        try {
            const [result] = await db.query(sql, values);
            console.log("✅ Inserción exitosa:", result);
            return result;
        } catch (error) {
            console.error("❌ Error en la consulta SQL:", error);
            throw error;
        }
        //return db.query(sql, values);
    },

    getAll: async () => {
        return db.query('SELECT * FROM aprovechadores');
    },

    getById: async (cedula) => {
        return db.query('SELECT * FROM aprovechadores WHERE cedula = ?', [cedula]);
    },

    update: async (cedula, aprovechador) => {
        const sql = `UPDATE aprovechadores SET contrato = ?, nombres = ?, apellidos = ?, telefono = ?, correo = ?, fechaNacimiento = ?, edad = ?, direccionEstablecimiento = ?, tipoVenta = ?, actividadEconomica = ?, direccionResidencia = ?, barrio = ?, estrato = ?, nivelSisben = ?, valorM2 = ?, ocupacionEspacioM2 = ?, valorTotal = ?, fechaInicio = ?, fechaFinalizacion = ?, observaciones = ? WHERE cedula = ?`;
        const values = [
            aprovechador.contrato,
            aprovechador.nombres,
            aprovechador.apellidos,
            aprovechador.telefono,
            aprovechador.correo,
            aprovechador.fechaNacimiento,
            aprovechador.edad,
            aprovechador.direccionEstablecimiento,
            aprovechador.tipoVenta,
            aprovechador.actividadEconomica,
            aprovechador.direccionResidencia,
            aprovechador.barrio,
            aprovechador.estrato,
            aprovechador.nivelSisben,
            aprovechador.valorM2,
            aprovechador.ocupacionEspacioM2,
            aprovechador.valorTotal,
            aprovechador.fechaInicio,
            aprovechador.fechaFinalizacion,
            aprovechador.observaciones,
            cedula
        ];
        
        return db.query(sql, values);
    },

    delete: async (cedula) => {
        return db.query('DELETE FROM aprovechadores WHERE cedula = ?', [cedula]);
    }
};

module.exports = Aprovechador;
