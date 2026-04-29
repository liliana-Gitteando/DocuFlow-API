
// FIX DNS (evita errores de conexión con MongoDB Atlas)
const dns = require('node:dns/promises');
dns.setServers(['1.1.1.1', '8.8.8.8']); 

// Cargar variables de entorno (.env)
require('dotenv').config();

// IMPORTACIÓN DE DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const radicadoRoutes = require('./routes/radicadoRoutes');

// Archivo de conexión a la base de datos
const conectarDB = require('./config/db');

// INICIALIZACIÓN DE LA APP
const app = express();

// CONEXIÓN A LA BASE DE DATOS
console.log("URI MongoDB:", process.env.MONGO_URI);

// Conectar a MongoDB
conectarDB();

// MIDDLEWARES

// Permite solicitudes desde otros dominios (CORS)
app.use(cors());
// Permite recibir datos en formato JSON
app.use(express.json());
// Definición de Rutas (El circuito de Docuflow)
app.use('/api/radicados', radicadoRoutes);

// RUTAS 

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// Prefijo /api para todas las rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor DocuFlow funcionando');
});

// CONFIGURACIÓN DEL SERVIDOR

// Puerto 
const PORT = process.env.PORT || 3000;

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});