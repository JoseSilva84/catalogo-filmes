const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aiRoutes = require('./src/routes/aiRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares globais
app.set('trust proxy', 1); // Necessário para o Render (proxy reverso) passar o IP correto para o req.ip
app.use(cors({
    origin: ['https://catalogo-filmes-gold.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Agrupamento de Rotas
app.use('/api', aiRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
