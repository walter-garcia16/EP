const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuarioRoutes'); // Importa correctamente las rutas

const app = express();

app.use(cors());
app.use(express.json());

// Configurar rutas
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
