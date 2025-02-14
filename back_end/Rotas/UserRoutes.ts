import express, { Request, Response } from 'express';
import supabase from '../DataBase/Conection_supra';

const router = express.Router();

// Rota para obter todos os usuarios
router.get('/ObterUsuarios', (req: Request, res: Response) => {

    console.log('Router Get do User')
})

// Rota para adicionar um novo usuario
router.post('/AdicionarUsuario', (req: Request, res: Response) => {

    // O retorno vai ser um ok caso adicionado corretamente.
    
    console.log('Router post do User')
})

// Rota para adicionar os dados de algum usuario
router.put('/AtualizarUsuario', (req: Request, res: Response) => {

    // O retorno vai ser um ok caso atualizado corretamente.
    
    console.log('Router put do User')
})

// Rota para obter os dados do dashboard para o usuario
router.get('/DashboardData',(req: Request, res: Response) => {
    // O retorno vai ser uma classe com todas as informações necessarias.

})

export default router;