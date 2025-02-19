import Supra_DataBase from '../DataBase/Conection_supra';
import { Streak, Usuario } from '../utilidades/Data_squema';
import UsuarioController from './UsuarioController';

const Obter_Usuario_Streak_Data = async (User_Email: string) => {
    try {
        const Usuario: Usuario = await UsuarioController.Obter_User_por_email(User_Email);

        if (!Usuario) throw new Error('Usuário não encontrado');

        const Streak: Streak = await UsuarioController.Obter_streak_pelo_Userid(Usuario.id);

        if (!Streak) throw new Error('Streak não encontrado');

        return {
            Streak_Atual: Streak.current_streak,
            Streak_Maior: Streak.longest_streak,
            Streak_Atualizado: Streak.updated_at,
        };
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao obter dados de streak do usuário');
    }
};

const Obter_Historico_Leituras_Usuario = async (User_Email: string) => {
    try {
        const Usuario: Usuario = await UsuarioController.Obter_User_por_email(User_Email);

        if (!Usuario) throw new Error('Usuário não encontrado');

        const { data, error } = await Supra_DataBase
            .from('newsletter_opens')
            .select('*')
            .eq('user_id', Usuario.id)
            .order('opened_at', { ascending: false });

        if (error) throw new Error('Erro ao obter histórico de leituras');

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Não consegui obter o histórico de leituras do usuário');
    }
};

const Obter_Ranking = async () => {
    try {
        const { data, error } = await Supra_DataBase
            .from('streaks')
            .select('*')
            .order('current_streak', { ascending: false })
            .limit(10);

        if (error) throw new Error('Erro ao obter o ranking de streaks');

        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Não consegui obter o top 10 de streaks');
    }
};

export default {
    Obter_Usuario_Streak_Data,
    Obter_Historico_Leituras_Usuario,
    Obter_Ranking,
};
