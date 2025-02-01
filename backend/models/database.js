const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
    host: "localhost", // Cambia si usas otro host
    user: "root",      // Tu usuario de MySQL
    password: "root",      // Tu contraseña de MySQL
    database: "espubli" // Nombre de tu base de datos
    
});



module.exports = db;
