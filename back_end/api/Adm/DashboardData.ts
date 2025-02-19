import { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "../../utilidades/cors";
import AdminDashboardController from "../../controller/AdminDashboardController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);

    if (req.method == 'GET') {
        const [EstatisticasCampanha,
            EstatisticasNoticias,
            EstatisticasGerais,
            Rank10] = await Promise.all([
                AdminDashboardController.Obter_Estatisticas_Campanhas(),
                AdminDashboardController.Obter_Estatisticas_Noticias(),
                AdminDashboardController.Obter_Metricas_Gerais(),
                AdminDashboardController.Obter_Top_Streaks()
            ])

        res.status(200).json({
            EstatisticasCampanha,
            EstatisticasNoticias,
            EstatisticasGerais,
            Rank10
        })

    }
}