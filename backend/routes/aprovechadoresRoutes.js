const express = require('express');
const router = express.Router();
const aprovechadorControler = require('../controlers/aprovechadorControler');

router.post('/', aprovechadorControler.crearAprovechador);

module.exports = router;
