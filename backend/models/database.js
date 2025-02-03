const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
    host: "localhost", // Cambia si usas otro host
    user: "root",      // Tu usuario de MySQL
    password: "root",      // Tu contraseña de MySQL
    database: "espubli", // Nombre de tu base de datos 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

module.exports = db;


module.exports = db;
