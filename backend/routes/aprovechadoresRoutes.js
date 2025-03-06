// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const aprovechadorControler = require("../controlers/aprovechadorControler"); // Importa correctamente el controlador
// const router = express.Router();

// // Configuración de multer para subir imágenes
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../uploads")); // Carpeta donde se guardarán las fotos
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });
// const upload = multer({ storage });

// // CRUD aprovechadores

// // Crear aprovechador
// //router.post('/', aprovechadorControler.guardarAprovechadores);
// //     try {
// //         const result = await aprovechadorControler.guardarAprovechadores(req.body);
// //         res.status(201).json({ success: true, message: "Aprovechador creado", data: result });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: "Error al crear aprovechador", error });
// //     }
// // };
// module.exports = router;

// // Listar todos los aprovechadores
// router.get('/aprovechadores', async (req, res) => {
//     try {
//         const result = await aprovechadorControler.listarAprovechadores();
//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error al listar aprovechadores", error });
//     }
// });

// // Obtener aprovechador por cédula
// router.get('/aprovechadores/:cedula', async (req, res) => {
//     try {
//         const result = await aprovechadorControler.obtenerAprovechadoresPorCedula(req.params.cedula);
//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error al obtener aprovechador", error });
//     }
// });

// // Actualizar aprovechador
// router.put('/aprovechadores', async (req, res) => {
//     try {
//         const result = await aprovechadorControler.actualizarAprovechadores(req.body);
//         res.status(200).json({ success: true, message: "Aprovechador actualizado", data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error al actualizar aprovechador", error });
//     }
// });

// // Eliminar aprovechador
// router.delete('/aprovechadores/:cedula', async (req, res) => {
//     try {
//         const result = await aprovechadorControler.eliminarAprovechadores(req.params.cedula);
//         res.status(200).json({ success: true, message: "Aprovechador eliminado", data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error al eliminar aprovechador", error });
//     }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // Middleware para manejar imágenes
const aprovechadorController = require("../controlers/aprovechadorControler");

// Rutas
router.post("/", upload.single("foto"), aprovechadorController.guardarAprovechadores);
router.get("/", aprovechadorController.listarAprovechadores);
router.put("/:cedula", upload.single("foto"), aprovechadorController.actualizarAprovechadores);
router.delete("/:cedula", aprovechadorController.eliminarAprovechadores);

router.post('/', aprovechadorControler.crearAprovechador);

module.exports = router;
