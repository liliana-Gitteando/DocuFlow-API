const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
        nombres_apellidos: { 
        type: String, 
        required: true, 
        unique: true 
    },
    usuario: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    rol: {
        type: String, 
        required: true 
    }, 
    dependencia: { 
        type: String,
        required: true 
    } 
    
}, { timestamps: true });
    module.exports = mongoose.model('Usuario', usuarioSchema);