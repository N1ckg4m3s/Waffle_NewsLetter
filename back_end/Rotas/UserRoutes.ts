import UserDashboardController from '../Controller/UserDashboardController';
import { Usuario } from '../Controller/Data_squema';
import UsuarioController from '../Controller/UsuarioController';
import express, { Request, Response } from 'express';


const router = express.Router();

// Rota para verificar a existencia do email
router.get('/Verificar_Email', async (req: Request, res: Response) => {
    const User_Email: string = req.query.email as string;

    try {
        const Data: Usuario = await UsuarioController.Obter_User_por_email(User_Email)
        if (Data) {
            res.status(200).send(Data.email);
        } else {
            res.status(500).send({ mensagem: 'E-mail inexistente' });
        }
    } catch (e) {
        res.status(500).send({ Error: e });
    }

    return
})

// Rota para obter os dados do dashboard para o usuario
router.get('/DashboardData', async (req: Request, res: Response) => {

    try {
        const User_Email: string = req.query.email as string

        const StreakData = await UserDashboardController.Obter_Usuario_Streak_Data(User_Email)

        const Historico = await UserDashboardController.Obter_Historico_Leituras_Usuario(User_Email)

        const RankingUsuarios = await UserDashboardController.Obter_Ranking()

        res.status(200).send({ StreakData, Historico, RankingUsuarios })

    } catch (e) {
        res.status(500).send(e)
    }
    // Ranking dos 10 principais
    // Historico de news lida.
    // O retorno vai ser uma classe com todas as informações necessarias.
})

// Rota para indicar a leitura de algum newsletter
router.post('/NovaLeitura', (req: Request, res: Response) => { UsuarioController.Adicionar_Leitura_Usuario(req, res) })

export default router;