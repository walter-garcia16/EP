const db = require('./database');

class Usuario {
    static async crearUsuario(datos, foto) {
        const { nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, formacion, aval, observaciones } = datos;

        try {
            const [resultado] = await db.execute(
                'INSERT INTO caracusuarios (nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, formacion, aval, observaciones, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nombres, apellidos, cedula, rol, fechaNacimiento, edad, celular, correo, direccion, barrio, municipio, formacion, aval, observaciones, foto]
            );
            return resultado;
        } catch (error) {
            console.error('Error al insertar usuario:', error);
            throw error;
        }
    }
}

module.exports = Usuario;
