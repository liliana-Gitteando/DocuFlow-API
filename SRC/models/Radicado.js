const Radicado = require('../models/Radicado');
const Contador = require('../models/Contador');

// Función para generar consecutivo
const generarConsecutivo = async () => {
    let contador = await Contador.findOne({ nombre: 'radicado' });

    if (!contador) {
        contador = new Contador({ nombre: 'radicado', valor: 1 });
    } else {
        contador.valor += 1;
    }

    await contador.save();

    return contador.valor;
};

// Crear radicado
const crearRadicado = async (req, res) => {
    try {
        const { asunto, remitente, tipo } = req.body;

        // Validar tipo
        if (!['E', 'S', 'I'].includes(tipo)) {
            return res.status(400).json({ error: 'Tipo inválido (E, S, I)' });
        }

        const consecutivo = await generarConsecutivo();

        // Formatear consecutivo (7 dígitos)
        const consecutivoStr = String(consecutivo).padStart(7, '0');

        // Fecha
        const fecha = new Date();
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const anio = fecha.getFullYear();

        const numero = `RAD-${tipo}-${dia}-${mes}-${anio}-${consecutivoStr}`;

        const nuevoRadicado = new Radicado({
            numero,
            asunto,
            remitente
        });

        await nuevoRadicado.save();

        res.json({
            mensaje: 'Radicado creado correctamente',
            numero
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al crear radicado' });
    }
};

module.exports = { crearRadicado };