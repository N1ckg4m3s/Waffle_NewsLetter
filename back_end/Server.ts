// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supabase from './DataBase/Conection_supra';

import UserRoute from "./Rotas/UserRoutes"

// Carregar as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar middleware
app.use(cors());
app.use(express.json());

// Gerenciar Rotas da API
app.use('/User',UserRoute)

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => { res.send('Funcionando')});

// Rota para buscar todos os usuários
// app.get('/users', async (req, res) => {
//     const { data, error } = await supabase.from('users').select('*');

//     if (error) {
//         return res.status(500).json({ error: 'Erro ao buscar usuários' });
//     }

//     res.json(data);
// });

// Rota para adicionar um novo usuário
// app.post('/users', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: 'E-mail é obrigatório' });
//     }

//     const { data, error } = await supabase.from('users').insert([{ email }]);

//     if (error) {
//         return res.status(500).json({ error: 'Erro ao adicionar usuário' });
//     }

//     res.status(201).json(data);
// });

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
