const Radicado = require('../models/Radicado');
const Usuario = require('../models/Usuario');
const Contador = require('../models/Contador');

// Función interna para el consecutivo
const generarConsecutivo = async () => {
    const contador = await Contador.findOneAndUpdate(
        { id: 'radicadoId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return contador.seq;
};

const crearRadicado = async (req, res) => {
    try {
        // 1. Extraemos los datos del formulario
        const { asunto, remitente, tipo, destinatarioId } = req.body;

        // 2. Validaciones iniciales
        if (!['E', 'S', 'I'].includes(tipo)) {
            return res.status(400).json({ error: 'Tipo de radicado no válido' });
        }

        // 3. Obtener datos del DESTINATARIO (Desde la lista de usuarios)
        const usuarioDestino = await Usuario.findById(destinatarioId);
        if (!usuarioDestino) {
            return res.status(404).json({ error: 'El destinatario seleccionado no existe en la base de datos.' });
        }

        // 4. Obtener datos del RADICADOR (El usuario que tiene la sesión iniciada)
        // Nota: req.usuario.id debe ser provisto por tu middleware de autenticación
        const usuarioRadicador = await Usuario.findById(req.usuario.id);
        if (!usuarioRadicador) {
            return res.status(401).json({ error: 'No se pudo identificar al usuario que radica.' });
        }

        // 5. Generar el número de radicado único
        const consecutivo = await generarConsecutivo();
        const consecutivoStr = String(consecutivo).padStart(7, '0');
        const fechaActual = new Date();
        const numeroRadicado = `RAD-${tipo}-${fechaActual.getFullYear()}-${consecutivoStr}`;

        // 6. Crear el nuevo documento con toda la trazabilidad
        const nuevoRadicado = new Radicado({
            numero: numeroRadicado,
            asunto,
            remitente,
            tipo,
            fecha: fechaActual,
            
            // Datos del Radicador (Automáticos)
            radicador: usuarioRadicador._id,
            nombreRadicador: usuarioRadicador.nombres_apellidos,
            areaRadicador: usuarioRadicador.dependencia, // Ejemplo: "Correspondencia"
            
            // Datos del Destinatario (Automáticos)
            destinatario: usuarioDestino._id,
            nombreDestinatario: usuarioDestino.nombres_apellidos,
            areaDestino: usuarioDestino.dependencia // Ejemplo: "Archivo", "Sistemas", etc.
        });

        // 7. Guardar en MongoDB
        await nuevoRadicado.save();

        res.status(201).json({
            mensaje: 'Radicado creado exitosamente',
            datos: {
                numero: nuevoRadicado.numero,
                destino: nuevoRadicado.nombreDestinatario,
                area: nuevoRadicado.areaDestino
            }
        });

    } catch (error) {
        console.error('Error en radicación:', error);
        res.status(500).json({ error: 'Error interno al procesar el radicado.' });
    }
};

module.exports = { crearRadicado };