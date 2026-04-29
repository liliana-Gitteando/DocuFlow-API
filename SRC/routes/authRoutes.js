const express = require('express');
const router = express.Router(); // 
// IMPORTACIÓN 
const authController = require('../controllers/authController');

// RUTAS
// Usamos el punto (.) para acceder a las funciones del objeto importado
router.post('/registro', authController.registrarUsuario);
router.post('/login', authController.loginUsuario);

module.exports = router;