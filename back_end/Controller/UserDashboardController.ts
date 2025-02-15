import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, Streak, Usuario } from './Data_squema';
import { Request, Response } from 'express';
import utilits from './utilits';
import UsuarioController from './UsuarioController';

const Obter_Usuario_Streak_Data = async (User_Email: string) => {
    const Usuario: Usuario = await UsuarioController.Obter_User_por_email(User_Email);

    if (!Usuario) throw new Error('Usuario não encontrado');

    const Streak: Streak = await UsuarioController.Obter_streak_pelo_Userid(Usuario.id);

    if (!Streak) throw new Error('Streak não encontrado');

    return {
        Streak_Atual: Streak.current_streak,
        Streak_Maior: Streak.longest_streak,
        Streak_Atualizado: Streak.updated_at,
    }
}

const Obter_Historico_Leituras_Usuario = async (User_Email: string) => {

    const Usuario: Usuario = await UsuarioController.Obter_User_por_email(User_Email);

    if (!Usuario) throw new Error('Usuario não encontrado');

    const { data, error } = await Supra_DataBase
        .from('newsletter_opens')
        .select('*')
        .eq('user_id', Usuario.id)
        .order('opened_at', { ascending: false })

    if (data) return data

    throw new Error('Não consegui obter o historico')
}

const Obter_Ranking = async () => {

    const { data, error } = await Supra_DataBase
        .from('streaks')
        .select('*')
        .order('current_streak', { ascending: false })
        .limit(10);

    if (data) return data

    throw new Error('Não consegui obter o top 10')
}

export default {
    Obter_Usuario_Streak_Data,
    Obter_Historico_Leituras_Usuario,
    Obter_Ranking
}