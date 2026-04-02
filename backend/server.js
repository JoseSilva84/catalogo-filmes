const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aiRoutes = require('./src/routes/aiRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares globais
app.use(cors());
app.use(express.json());

// Agrupamento de Rotas
app.use('/api', aiRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
