import UsuarioController from '../Controller/UsuarioController';
import express, { Request, Response } from 'express';


const router = express.Router();

// Rota para obter os dados do dashboard para o usuario
router.get('/DashboardData', (req: Request, res: Response) => {
    // O retorno vai ser uma classe com todas as informações necessarias.

})

// Rota para indicar a leitura de algum newsletter
router.post('/NovaLeitura', (req: Request, res: Response) => { UsuarioController.Adicionar_Leitura_Usuario(req, res) })

export default router;