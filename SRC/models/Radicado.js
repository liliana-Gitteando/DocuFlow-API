const mongoose = require('mongoose');

const RadicadoSchema = new mongoose.Schema({
    // INFORMACIÓN BÁSICA DEL REGISTRO 
    numero: { 
        type: String, 
        required: true, 
        unique: true 
    }, // Ejemplo: RAD-E-300-29/04/2026-0000001
    asunto: { 
        type: String, 
        required: true 
    },
    remitente: { 
        type: String, 
        required: true 
    },
    tipo: { 
        type: String, 
        enum: ['E', 'S', 'I'], 
        required: true 
    }, // Entrada, Salida, Interno
    fecha: { 
        type: Date, 
        default: Date.now 
    },

    // CLASIFICACIÓN TÉCNICA SEGÚN TRD 
    vencimiento: { 
        type: Date 
    }, // Aquí se guardan los 15 días hábiles para PQRS 
    serie: { 
        type: String 
    }, // Código de la Serie Documental 
    subserie: { 
        type: String 
    }, // Código de la Subserie 
    tipoDocumental: { 
        type: String 
    }, // Ej: "PQRS", "Acta", "Contrato" 
    anexos: { 
        type: String 
    }, // Descripción: USB, CD, 2 Carpetas, etc. 

    // TRAZABILIDAD: QUIÉN RADICA 
    radicador: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    nombreRadicador: { 
        type: String 
    },
    areaRadicador: { 
        type: String 
    },

    // TRAZABILIDAD: QUIÉN RECIBE 
    destinatario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    },
    nombreDestinatario: { 
        type: String 
    },
    areaDestino: { 
        type: String 
    }
});

module.exports = mongoose.model('Radicado', RadicadoSchema);