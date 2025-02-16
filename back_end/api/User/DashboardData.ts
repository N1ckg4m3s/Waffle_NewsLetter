import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UserDashboardController from "../../controller/UserDashboardController";

export default async function handler (req: VercelRequest, res: VercelResponse) {
    if(req.method=='GET'){
        try {
            const User_Email: string = req.query.email as string
    
            const StreakData = await UserDashboardController.Obter_Usuario_Streak_Data(User_Email)
    
            const Historico = await UserDashboardController.Obter_Historico_Leituras_Usuario(User_Email)
    
            const RankingUsuarios = await UserDashboardController.Obter_Ranking()
    
            res.status(200).send({ StreakData, Historico, RankingUsuarios })
    
        } catch (e) {
            res.status(500).send(e)
        }
    }
}