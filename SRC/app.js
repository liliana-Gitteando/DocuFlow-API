require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const conectarDB = require('./config/db');
conectarDB();

app.use(express.json());
app.use(cors());
const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Servidor DocuFlow funcionando');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});