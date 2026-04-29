const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // Definición de roles autorizados
    rol: {
        type: String,
        enum: ['ADMIN', 'GESTOR', 'RADICADOR', 'FUNCIONARIO'],
        default: 'FUNCIONARIO'
    }, 
    
    dependencia: { 
        type: String 
    } 
    
}, { timestamps: true });
    module.exports = mongoose.model('Usuario', usuarioSchema);