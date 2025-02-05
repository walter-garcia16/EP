const db = require("../models/database");

class Usuario {
    static async crearUsuario(datos) {
        const {
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion,
            barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, foto
        } = datos;

        console.log("Valores antes de insertar:", datos);

        const sql = `
            INSERT INTO caracusuarios 
            (nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, foto) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return db.execute(sql, [
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion,
            barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, foto 
        ]);
    }
}

module.exports = Usuario;
