// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoute from "./Rotas/UserRoutes"

// Carregar as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Gerenciar Rotas da API
app.use('/User', UserRoute)

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => { res.send('Funcionando') });

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

export default app;