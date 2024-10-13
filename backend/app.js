require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Certifique-se de importar o CORS

const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');

const app = express();

// Adiciona o middleware CORS ANTES das rotas
app.use(cors());

// Habilita o uso de JSON
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log('Server running on port 3000'));
