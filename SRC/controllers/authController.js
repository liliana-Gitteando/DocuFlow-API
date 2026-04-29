// CONTROLADOR DE AUTENTICACIÓN
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');

// REGISTRO DE USUARIO
const registrarUsuario = async (req, res) => {
  try {
    const { usuario, password, rol, dependencia } = req.body;


    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const existeUsuario = await Usuario.findOne({ usuario });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    console.log('Contraseña enviada (Postman):', password);
    console.log('Hash en BD (Mongo):', usuarioEncontrado.password);

    const esValida = await bcrypt.compare(password, usuarioEncontrado.password);
    console.log('¿Es válida según bcrypt?:', esValida);

// Encriptación de la contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordEncriptada = await bcrypt.hash(password, salt);
  const nuevoUsuario = new Usuario({
    usuario,
    password: passwordEncriptada, 
    rol: rol || 'FUNCIONARIO',
    dependencia: dependencia
});
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// LOGIN DE USUARIO
const loginUsuario = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    //Buscar usuario en la BD
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    console.log('1. Password que llega de Postman:', `"${password}"`); 
    console.log('2. Hash recuperado de la BD:', usuarioEncontrado.password);

    //Comparar la contraseña ingresada con el hash de la BD
    const esValida = (password === usuarioEncontrado.password);

    console.log('3. ¿Resultado de la comparación?:', esValida);

    if (!esValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }
    
    res.status(200).json({ mensaje: 'Autenticación satisfactoria',
      rol: usuarioEncontrado.rol, 
      dependencia: usuarioEncontrado.dependencia});
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// EXPORTACIÓN
module.exports = {
  registrarUsuario,
  loginUsuario
};