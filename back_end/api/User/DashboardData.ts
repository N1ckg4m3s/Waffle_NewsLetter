import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UserDashboardController from "../../controller/UserDashboardController";
import { allowCors } from "../../utilidades/cors";
import { DatabaseResponse, Usuario } from "../../utilidades/Data_squema";
import Supra_DataBase from "../../DataBase/Conection_supra";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);
    if (req.method == 'GET') {
        try {
            const User_Email: string = req.query.email as string

            if (!User_Email) res.status(400).json({ mensage: 'Email inexistente' });

            const { data, error }: DatabaseResponse<Usuario> = await Supra_DataBase
                .from('users')
                .select('*')
                .eq('email', User_Email)
                .single();

            if (data) {
                const StreakData = await UserDashboardController.Obter_Usuario_Streak_Data(User_Email)

                const Historico = await UserDashboardController.Obter_Historico_Leituras_Usuario(User_Email)

                const RankingUsuarios = await UserDashboardController.Obter_Ranking()

                res.status(200).json({ StreakData, Historico, RankingUsuarios })
            } else {
                res.status(400).json({ message: 'Usuario inexistente nos registros' })
            }

        } catch (e) {
            res.status(400).json({ message: e })
        }
    }
}