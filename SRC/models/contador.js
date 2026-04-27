const mongoose = require('mongoose');

const ContadorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    valor: { type: Number, default: 0 }
});

module.exports = mongoose.model('Contador', ContadorSchema);