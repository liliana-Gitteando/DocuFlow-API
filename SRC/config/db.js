//conexión a MongoDB
const mongoose = require('mongoose');

//conexión asíncrona para conectar a la BD 
const conectarDB = async () => {
  try {
    //Intentar conexión usando la URI del archivo .env 
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    //Finaliza la aplicación si falla la conexión 
    process.exit(1);
  }
};

module.exports = conectarDB;
