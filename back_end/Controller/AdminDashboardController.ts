import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, AdminDashboardMetrics, Streak } from '../utilidades/Data_squema';

const Obter_Metricas_Gerais = async (StartIso: string, EndIso: string): Promise<AdminDashboardMetrics> => {
    try {
        // Obter o número total de usuários
        const { count: total_users, error: totalUsersError } = await Supra_DataBase
            .from('users')
            .select('id', { count: 'exact' });

        if (totalUsersError) throw new Error('Erro ao obter número de usuários');

        // Obter o número total de leituras
        const { count: total_opens, error: totalOpensError } = await Supra_DataBase
            .from('newsletter_opens')
            .select('id', { count: 'exact' });

        if (totalOpensError) throw new Error('Erro ao obter número de leituras');

        // Obter média de streaks por usuário
        const { data: streaksData, error: streaksError } = await Supra_DataBase
            .from('streaks')
            .select('current_streak');

        if (streaksError) throw new Error('Erro ao obter dados de streaks');

        const avg_streak = streaksData.length
            ? streaksData.reduce((acc, s) => acc + (s.current_streak || 0), 0) / streaksData.length
            : 0;

        // Obter porcentagem de abertura nos últimos 7 dias
        const { count: leiturasUltimos7Dias, error: opensLast7DaysError } = await Supra_DataBase
            .from('newsletter_opens')
            .select('id', { count: 'exact' })
            .gte('opened_at', StartIso)
            .lte('opened_at', EndIso);

        if (opensLast7DaysError) throw new Error('Erro ao obter leituras dos últimos 7 dias');
        if (leiturasUltimos7Dias) {
            const porcentagemAbertura = total_users ? (leiturasUltimos7Dias / total_users) * 100 : 0;
            return {
                total_users: total_users || 0,
                total_opens: total_opens || 0,
                avg_streak,
                porcentagemAbertura,
            };
        } else {
            return {
                total_users: 0,
                total_opens: 0,
                avg_streak,
                porcentagemAbertura: 0,
            };
        }

    } catch (error) {
        console.error(error);
        throw new Error('Erro ao obter métricas gerais');
    }
};

const Obter_Estatisticas_Noticias = async (StartIso: string, EndIso: string) => {
    try {
        const { data, error } = await Supra_DataBase
            .from('newsletter_opens')
            .select('edition_id')
            .gte('opened_at', StartIso)
            .lte('opened_at', EndIso);

        if (error || !data) throw new Error('Erro ao obter estatísticas das notícias');

        const estatisticas = data.reduce((acc: Map<number, number>, { edition_id }) => {
            acc.set(edition_id, (acc.get(edition_id) || 0) + 1);
            return acc;
        }, new Map());

        const estatisticasOrdenadas = Array.from(estatisticas.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([edition_id, count]) => ({ edition_id, count }));

        return {
            leituras_7_dias: estatisticasOrdenadas,
            mais_lida: estatisticasOrdenadas[0] || null,
            menos_lida: estatisticasOrdenadas.at(-1) || null,
        };
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao obter estatísticas de notícias');
    }
};

const Obter_Top_Streaks = async () => {
    try {
        const { data, error } = await Supra_DataBase
            .from('streaks')
            .select('user_id, longest_streak')
            .order('longest_streak', { ascending: false })
            .limit(10);

        if (error || !data) throw new Error('Erro ao obter top streaks');

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao obter top streaks');
    }
};

const Obter_Estatisticas_Campanhas = async (StartIso: string, EndIso: string) => {
    try {
        const { data, error } = await Supra_DataBase
            .from('utm_data')
            .select('utm_source, utm_medium, utm_campaign, utm_channel')
            .gte('opened_at', StartIso)
            .lte('opened_at', EndIso);

        if (error) {
            throw new Error(`Obter_Estatisticas_Campanhas Supabase Error: ${error.message} - ${error.details}`);
        }

        if (!data || data.length === 0) {
            return [];
        }

        return data;
    } catch (error) {
        console.warn("❌ Erro inesperado:", error);
        throw new Error('Erro ao obter estatísticas de campanhas');
    }
};


export default {
    Obter_Metricas_Gerais,
    Obter_Estatisticas_Noticias,
    Obter_Top_Streaks,
    Obter_Estatisticas_Campanhas,
};
