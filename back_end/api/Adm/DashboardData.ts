import { VercelRequest, VercelResponse } from "@vercel/node";
import { allowCors } from "../../utilidades/cors";
import AdminDashboardController from "../../controller/AdminDashboardController";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);

    if (req.method == 'GET') {
        const EstatisticasCampanha = await AdminDashboardController.Obter_Estatisticas_Campanhas()
        const EstatisticasNoticias = await AdminDashboardController.Obter_Estatisticas_Noticias()
        const EstatisticasGerais = await AdminDashboardController.Obter_Metricas_Gerais()
        const Rank10 = await AdminDashboardController.Obter_Top_Streaks()

        res.status(200).json({
            EstatisticasCampanha,
            EstatisticasNoticias,
            EstatisticasGerais,
            Rank10
        })

    }
}