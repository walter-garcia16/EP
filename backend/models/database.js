const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
    host: "localhost", 
    user: "root",     
    password: "root",     
    database: "espubli", 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

module.exports = db;
