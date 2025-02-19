import { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors } from '../../utilidades/cors';
import AdminDashboardController from '../../controller/AdminDashboardController';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);

    if (req.method === 'GET') {
        // Definir datas padrão como os últimos 7 dias
        const hoje = new Date();
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(hoje.getDate() - 7);

        const StratDate: string = (req.query.start_date as string) || seteDiasAtras.toISOString();
        const EndDate: string = (req.query.end_date as string) || hoje.toISOString();

        const start_date_obj:Date = new Date(StratDate)
        const end_date_obj:Date = new Date(EndDate)

        if(end_date_obj < start_date_obj) return res.status(400).json({ error: 'EndDate não pode ser menor que StartDate' });

        try {
            const [EstatisticasCampanha,
                EstatisticasNoticias,
                EstatisticasGerais,
                Rank10] = await Promise.all([
                    AdminDashboardController.Obter_Estatisticas_Campanhas(StratDate, EndDate),
                    AdminDashboardController.Obter_Estatisticas_Noticias(StratDate, EndDate),
                    AdminDashboardController.Obter_Metricas_Gerais(StratDate, EndDate),
                    AdminDashboardController.Obter_Top_Streaks()
                ]);

            res.status(200).json({
                EstatisticasCampanha,
                EstatisticasNoticias,
                EstatisticasGerais,
                Rank10,
            });
        } catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            res.status(500).json({ error: 'Erro ao obter estatísticas' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
