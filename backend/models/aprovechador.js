// const db = require('./database');

// // // Guardar aprovechador
// // const guardarAprovechadores = async (datos) => {
// //     // Desestructuramos los datos
// //     const {
// //         contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
// //         direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
// //         nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
// //     } = datos;
// class Aprovechador {
//     static guardarAprovechadores(datos) {
//         console.log("Guardando en la base de datos:", datos);
//         console.log("Valores antes de insertar:", datos);
//         // Código para guardar en la base de datos
//     }
// }

// module.exports = Aprovechador;
    
//     const guardarAprovechadores = {
//         create: async (aprovechador) => {
//     const sql = `
//         INSERT INTO aprovechadores (
//             contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//             direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//             nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [aprovechador.contrato,
//         aprovechador.nombres,
//         aprovechador.apellidos,
//         aprovechador.cedula,
//         aprovechador.telefono,
//         aprovechador.correo,
//         aprovechador.fechaNacimiento,
//         aprovechador.edad,
//         aprovechador.direccionEstablecimiento,
//         aprovechador.tipoVenta,
//         aprovechador.actividadEconomica,
//         aprovechador.direccionResidencia,
//         aprovechador.barrio,
//         aprovechador.estrato,
//         aprovechador.nivelSisben,
//         aprovechador.valorM2,
//         aprovechador.ocupacionEspacioM2,
//         aprovechador.valorTotal,
//         aprovechador.fechaInicio,
//         aprovechador.fechaFinalizacion,
//         aprovechador.observaciones,
//         aprovechador.foto
//     ];
    
//     try {
//         const [result] = await db.execute(sql, values);
//         console.log("✅ Inserción exitosa:", result);
//         //console.log("✅ Resultado de la inserción directa:", result);
//         return result;
//     } catch (error) {
//         console.error("❌ Error en la consulta SQL: ", error);
//         throw (error);
//     }
//      console.log("Ejecutando SQL:", sql);
//     console.log("Valores:", values);
//         }
//     };
//     // return db.execute(sql, [
//     //     contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//     //     direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//     //     nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
//     // ]);
    

// // Listar todos los aprovechadores
// const listarAprovechadores = async () => {
//     return db.execute('SELECT * FROM aprovechadores');
// };

// // Obtener aprovechador por cédula
// const obtenerAprovechadoresPorCedula = async (cedula) => {
//     const [result] = await db.execute('SELECT * FROM aprovechadores WHERE cedula = ?', [cedula]);
//     return result[0];
// };

// // Actualizar aprovechador
// const actualizarAprovechadores = async (datos) => {
//     const {
//         contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad,
//         direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, estrato,
//         nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto
//     } = datos;

//     const sql = `
//         UPDATE aprovechadores
//         SET contrato = ?, nombres = ?, apellidos = ?, telefono = ?, correo = ?, fechaNacimiento = ?, 
//             edad = ?, direccionEstablecimiento = ?, tipoVenta = ?, actividadEconomica = ?, direccionResidencia = ?, 
//             barrio = ?, estrato = ?, nivelSisben = ?, valorM2 = ?, ocupacionEspacioM2 = ?, valorTotal = ?, 
//             fechaInicio = ?, fechaFinalizacion = ?, observaciones = ?, foto = ?
//         WHERE cedula = ?
//     `;
//     return db.execute(sql, [
//         contrato, nombres, apellidos, telefono, correo, fechaNacimiento, edad, direccionEstablecimiento, tipoVenta,
//         actividadEconomica, direccionResidencia, barrio, estrato, nivelSisben, valorM2, ocupacionEspacioM2,
//         valorTotal, fechaInicio, fechaFinalizacion, observaciones, foto, cedula
//     ]);
// };

// // Eliminar aprovechador
// const eliminarAprovechadores = async (cedula) => {
//     return db.execute('DELETE FROM aprovechadores WHERE cedula = ?', [cedula]);
// };

// // Exportamos las funciones correctamente
// module.exports = {
//     guardarAprovechadores,
//     listarAprovechadores,
//     obtenerAprovechadoresPorCedula,
//     actualizarAprovechadores,
//     eliminarAprovechadores
// };
const db = require('./database');

class Aprovechador {
    static async guardarAprovechadores(datos) {
        try {
            const sql = `
                INSERT INTO aprovechadores 
                (contrato, nombres, apellidos, cedula, telefono, correo, fechaNacimiento, edad, 
                 direccionEstablecimiento, tipoVenta, actividadEconomica, direccionResidencia, barrio, 
                 estrato, nivelSisben, valorM2, ocupacionEspacioM2, valorTotal, fechaInicio, 
                 fechaFinalizacion, observaciones, foto) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const valores = Object.values(datos);
            await db.query(sql, valores);
        } catch (error) {
            throw new Error("Error al guardar aprovechador: " + error.message);
        }
    }

    static async listarAprovechadores() {
        try {
            const [resultados] = await db.query("SELECT * FROM aprovechadores");
            return resultados;
        } catch (error) {
            throw new Error("Error al listar aprovechadores: " + error.message);
        }
    }

    static async actualizarAprovechadores(cedula, datos) {
        try {
            const updates = Object.keys(datos).map((campo) => `${campo} = ?`).join(", ");
            const valores = [...Object.values(datos), cedula];

            const sql = `UPDATE aprovechadores SET ${updates} WHERE cedula = ?`;
            await db.query(sql, valores);
        } catch (error) {
            throw new Error("Error al actualizar aprovechador: " + error.message);
        }
    }

    static async eliminarAprovechadores(cedula) {
        try {
            await db.query("DELETE FROM aprovechadores WHERE cedula = ?", [cedula]);
        } catch (error) {
            throw new Error("Error al eliminar aprovechador: " + error.message);
        }
    }
}

module.exports = Aprovechador;
