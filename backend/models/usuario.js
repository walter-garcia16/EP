const db = require("../models/database");

class Usuario {
    static async crearUsuario(datos) {
        const {
            cedula, nombres, apellidos, rol, fechaNacimiento, edad, celular, correo, direccion,
            barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones, 
        } = datos;

        console.log("Valores antes de insertar:", datos); // 🔍 Verifica que no haya undefined

        // // Validar que ningún campo sea undefined antes de la inserción
        // if (!nombres || !apellidos || !cedula || !rol || !fechaNacimiento || !edad || !celular || !correo || !direccion || !barrio || !municipio || !fechaInicio || !fechaFinal || !formacion || !aval ||!observaciones) {
        //     return res.status(400).json({ mensaje: "Debe completar todos los campos" });
        // }

        const sql = `
            INSERT INTO caracusuarios 
            (nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        return db.execute(sql, [
            nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion,
            barrio, municipio, fechaIngreso, fechaFinalizacion, formacion, aval, observaciones 
        ]);
    }
}

module.exports = Usuario;
