import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, AdminDashboardMetrics, Streak } from '../utilidades/Data_squema';

const Obter_Metricas_Gerais = async (): Promise<AdminDashboardMetrics> => {
    // Obter o número total de usuários
    const { data: totalUsersData, error: totalUsersError, count: totalUsersCount } = await Supra_DataBase
        .from('users')
        .select('id', { count: 'exact' });

    if (totalUsersError) throw new Error('Erro ao obter número de usuários');

    const total_users: number = totalUsersCount || 0;

    // Obter o número total de leituras
    const { data: totalOpensData, error: totalOpensError, count: totalOpensCount } = await Supra_DataBase
        .from('newsletter_opens')
        .select('id', { count: 'exact' });

    if (totalOpensError) throw new Error('Erro ao obter número de leituras');

    const total_opens: number = totalOpensCount || 0;

    // Obter média de streaks por usuário
    const { data: streaksData, error: streaksError } = await Supra_DataBase
        .from('streaks')
        .select('current_streak');

    if (streaksError) throw new Error('Erro ao obter dados de streaks');

    const totalStreaks = streaksData.length;
    const avg_streak = totalStreaks
        ? streaksData.reduce((acc: number, s: any) => acc + (s.current_streak || 0), 0) / totalStreaks
        : 0;




    // Obter porcentagem de abertura nos últimos 7 dias
    const { data: opensLast7DaysData, error: opensLast7DaysError } = await Supra_DataBase
        .from('newsletter_opens')
        .select('id')
        .gte('opened_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (opensLast7DaysError) throw new Error('Erro ao obter leituras dos últimos 7 dias');

    const leiturasUltimos7Dias = opensLast7DaysData.length;
    const porcentagemAbertura = total_users
        ? (leiturasUltimos7Dias / total_users) * 100
        : 0;

    return {
        total_users,
        total_opens,
        avg_streak,
        porcentagemAbertura
    };
};


const Obter_Estatisticas_Noticias = async () => {
    const { data, error } = await Supra_DataBase
        .from('newsletter_opens')
        .select('edition_id');

    if (error || !data) {
        throw new Error('Erro ao obter estatísticas das notícias');
    }

    const Grupos: Map<number, number> = new Map();

    data.forEach((item) => {
        const count = Grupos.get(item.edition_id) || 0;
        Grupos.set(item.edition_id, count + 1);
    });

    // Convertendo o Map em um array ordenado
    const estatisticasOrdenadas = Array.from(Grupos.entries())
        .sort((a, b) => b[1] - a[1]) // Ordena do mais lido para o menos lido
        .map(([edition_id, count]) => ({ edition_id, count }));

    return {
        leituras_7_dias: estatisticasOrdenadas,
        mais_lida: estatisticasOrdenadas[0] || null,
        menos_lida: estatisticasOrdenadas[estatisticasOrdenadas.length - 1] || null,
    };
};




const Obter_Top_Streaks = async () => {
    const { data, error } = await Supra_DataBase
        .from('streaks')
        .select('user_id, longest_streak')
        .order('longest_streak', { ascending: false })
        .limit(10);

    if (error || !data) throw new Error('Erro ao obter top streaks');

    return data;
};

const Obter_Estatisticas_Campanhas = async () => {
    const { data, error } = await Supra_DataBase
        .from('utm_data')
        .select('utm_source, utm_medium, utm_campaign, utm_channel');

    if (error || !data) throw new Error('Erro ao obter estatísticas de campanhas');

    return data;
};

export default {
    Obter_Metricas_Gerais,
    Obter_Estatisticas_Noticias,
    Obter_Top_Streaks,
    Obter_Estatisticas_Campanhas
};
