const express = require('express');
const router = express.Router();
const radicadoController = require('../controllers/radicadoController'); 
router.post('/crear', radicadoController.crearRadicado);

module.exports = router;