const Usuario = require('../models/Usuario');

// REGISTRO
const registrar = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const nuevoUsuario = new Usuario({ usuario, password });
        await nuevoUsuario.save();

        res.json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        const user = await Usuario.findOne({ usuario });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ mensaje: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
};

module.exports = { registrar, login };