require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./SRC/models/usuarios'); 

const MONGO_URI = process.env.MONGO_URI;

const usuariosParaCargar = [
    {
        nombres_apellidos: "Roa Pabon Juan Manuel",
        usuario: "adminrpjuanm",
        password: "admin123",
        rol: "ADMIN",
        dependencia: "Archivo y correspondencia"
    },
    {
        nombres_apellidos: "Cortes Valderrama Diana Maria",
        usuario: "cvdianam",
        password: "rad1456",
        rol: "RADICADOR",
        dependencia: "Correspondencia"
    },
    {
        nombres_apellidos: "Lopez Alvarez Mario Hernan",
        usuario: "lamarioh",
        password: "rad2456",
        rol: "RADICADOR",
        dependencia: "Correspondencia"
    },
    {
        nombres_apellidos: "Nuñez Suarez Marlon",
        usuario: "nsmarlon",
        password: "rad3456",
        rol: "RADICADOR",
        dependencia: "Correspondencia"
    },
    {
        nombres_apellidos: "Bustamante Martinez Camilo Andres",
        usuario: "bmcamiloa",
        password: "gest1456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Urrea Ortiz Hernando",
        usuario: "uohernando",
        password: "gest2456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Osorio Zapata Maira Alejandra ",
        usuario: "ozmairaa",
        password: "gest4456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Ilnes Niño Luisa",
        usuario: "lnluisa",
        password: "gest5456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "ltamira Diaz Mario Fernando",
        usuario: "admariof",
        password: "gest5456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Diaz Moreno Lorena",
        usuario: "dmlorena",
        password: "gest6456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Cortes Usme Dario Armando",
        usuario: "cudarioa",
        password: "gest7456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Alvarez Ardila David",
        usuario: "aadavid",
        password: "gest8456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Romero Doncan Sandra",
        usuario: "rdsandra",
        password: "gest9456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Velez Huerfano Juan Manuel",
        usuario: "vhjuanm",
        password: "gest10456",
        rol: "GESTOR",
        dependencia: "Archivo"
    },
    {
        nombres_apellidos: "Ospina Mendez Pablo",
        usuario: "ompablo",
        password: "pablo123",
        rol: "FUNCIONARIO",
        dependencia: "Sistemas"
    },
    {
        nombres_apellidos: "Huerfano Gonzalez Francy",
        usuario: "hgfrancy",
        password: "fran123",
        rol: "FUNCIONARIO",
        dependencia: "Direccióngeneral"
    },
    {
        nombres_apellidos: "Nuñez Moreno Margareth",
        usuario: "nmmargareth",
        password: "margareth123",
        rol: "FUNCIONARIO",
        dependencia: "RecursosHumanos"        
    },
    {
        nombres_apellidos: "Mantilla Lara Santiago Alberto ",
        usuario: "mlsantiagoa",
        password: "santiago123",
        rol: "FUNCIONARIO",
        dependencia: "Marketing"        
    },
    {
        nombres_apellidos: "Jimenez Doncel  Andrea Patricia",
        usuario: "jdandreap",
        password: "Andrea123",
        rol: "FUNCIONARIO",
        dependencia: "Comercial"        
    },
    {
        nombres_apellidos: "Perez Peñaloza Samuel",
        usuario: "ppsamuel",
        password: "Samuel123",
        rol: "FUNCIONARIO",
        dependencia: "Contabilidad"        
    },
    {
        nombres_apellidos: "Figueredo Gomez Danel Alfonso",
        usuario: "fgdaniela",
        password: "Daniel123",
        rol: "FUNCIONARIO",
        dependencia: "Logistica y compras"        
    },

];

const importarDatos = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB Atlas...');

        // Limpiar la colección para no duplicar
        await Usuario.deleteMany();
        console.log('limpiando colección');

        // Insertar los nuevos
        try {
        console.log('Insertando usuarios...');
        await Usuario.insertMany(usuariosParaCargar);
        } catch (error) {
        if (error.name === 'ValidationError') {
           
        console.error('Error en los datos de un usuario específico.');
    }
    throw error; 
}
        console.log('Insertando usuarios...');

        console.log('¡Carga exitosa! Ya puedes cerrar este archivo.');
        process.exit();

    } catch (error) {
        console.error('Error durante la carga:', error);
        process.exit(1);
    }
};

importarDatos();