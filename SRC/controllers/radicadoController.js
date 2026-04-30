const Radicado = require('../models/Radicado'); 
const Usuario = require('../models/usuarios');  
const Contador = require('../models/contador'); 

// Lógica de Días Hábiles (Lunes a Viernes incluyendo festivos horario Colombiano) 
    const festivos2026 = [
    '2026-01-01', '2026-01-12', '2026-03-23', '2026-04-02', 
    '2026-04-03', '2026-05-01', '2026-05-18', '2026-06-08', 
    '2026-06-15', '2026-06-29', '2026-07-20', '2026-08-07', 
    '2026-08-17', '2026-10-12', '2026-11-02', '2026-11-16', 
    '2026-12-08', '2026-12-25'
];

const calcularVencimiento = (fechaInicio, diasHabiles) => {
    let fecha = new Date(fechaInicio);
    let cont = 0;
    while (cont < diasHabiles) {
        fecha.setDate(fecha.getDate() + 1);
        
        const fechaISO = fecha.toISOString().split('T')[0];
        const esFinDeSemana = fecha.getDay() === 0 || fecha.getDay() === 6;
        const esFestivo = festivos2026.includes(fechaISO);

        // Solo suma si NO es fin de semana Y NO es festivo
        if (!esFinDeSemana && !esFestivo) {
            cont++;
        }
    }
    return fecha;
};

// Función interna para el consecutivo único 
const generarConsecutivo = async () => {
    const contador = await Contador.findOneAndUpdate(
        { id: 'radicadoId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return contador.seq;
};

// Función principal de creación 
const crearRadicado = async (req, res) => {
    try {
        // Extrae todos los datos necesarios del formulario una sola vez
        const { asunto, remitente, tipo, destinatarioId, anexos, serie, subserie, tipoDocumental } = req.body;

        // Validaciones iniciales de tipo
        if (!['E', 'S', 'I'].includes(tipo)) {
            return res.status(400).json({ error: 'Tipo de radicado no válido' });
        }

        // Obtener datos del DESTINATARIO y RADICADOR
        const usuarioDestino = await Usuario.findById(destinatarioId);
        const usuarioRadicador = await Usuario.findById(req.usuario.id);

        if (!usuarioDestino || !usuarioRadicador) {
            return res.status(404).json({ error: 'Usuario destino o radicador no encontrado.' });
        }

        // GENERACIÓN DEL NÚMERO DE RADICADO
        const consecutivo = await generarConsecutivo();
        const consecutivoStr = String(consecutivo).padStart(7, '0');
        const fechaActual = new Date();
        
        // Formato fecha: DD/MM/AAAA
        const dia = String(fechaActual.getDate()).padStart(2, '0');
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const anio = fechaActual.getFullYear();
        const fechaStr = `${dia}/${mes}/${anio}`;

        const dependenciaCod = usuarioRadicador.dependencia || '000';
        const numeroRadicado = `RAD-${tipo}-${dependenciaCod}-${fechaStr}-${consecutivoStr}`;

        // CÁLCULO DE VENCIMIENTO 
        let fechaVencimiento = null;
        if (tipoDocumental === 'PQRS') {
            fechaVencimiento = calcularVencimiento(fechaActual, 15);
        }

        // Se crea el registro con el Modelo de la base de datos
        const nuevoRadicado = new Radicado({
            numero: numeroRadicado,
            asunto,
            remitente,
            tipo,
            fecha: fechaActual,
            vencimiento: fechaVencimiento,
            serie,
            subserie,
            tipoDocumental,
            anexos,
            radicador: usuarioRadicador._id,
            nombreRadicador: usuarioRadicador.nombres_apellidos,
            areaRadicador: usuarioRadicador.dependencia,
            destinatario: usuarioDestino._id,
            nombreDestinatario: usuarioDestino.nombres_apellidos,
            areaDestino: usuarioDestino.dependencia 
        });

        await nuevoRadicado.save();

        res.status(201).json({
            mensaje: 'Radicado creado exitosamente',
            datos: {
                numero: nuevoRadicado.numero,
                asunto: nuevoRadicado.asunto,
                vencimiento: nuevoRadicado.vencimiento ? nuevoRadicado.vencimiento.toLocaleDateString() : 'No aplica',
                anexos: nuevoRadicado.anexos || 'Sin anexos'},
                acciones: {
                imprimirEtiqueta: `/api/radicados/etiqueta/${nuevoRadicado._id}`, 
                notificacion: `Se ha enviado una copia al correo del remitente.` 
            }
        });

    } catch (error) {
        console.error('Error en radicación:', error);
        res.status(500).json({ error: 'Error interno al procesar el radicado.' });
    }
};

module.exports = { crearRadicado };