import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, Streak, Usuario } from './Data_squema';
import { Request, Response } from 'express';

const Obter_por_email = async (email: string): Promise<Usuario> => {
    const { data, error }: DatabaseResponse<Usuario> = await Supra_DataBase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) throw new Error('Email inexistente');

    return data;
}

const Obter_streak_pelo_Userid = async (id: number): Promise<Streak> => {
    const { data, error } = await Supra_DataBase
        .from('streaks')
        .select('*')
        .eq('user_id', id)
        .single();

    if (error || !data) throw new Error('Streak inexistente');

    return data;
}

const Atualizar_streak = async (streak: Streak) => {
    const Hoje: Date = new Date();
    const UltimoAcesso = streak.last_open_date ? new Date(streak.last_open_date) : null;

    if (!UltimoAcesso) {
        // Não tem registro, iniciar com 1
        await Supra_DataBase
            .from('streaks')
            .update({
                current_streak: 1,
                last_open_date: Hoje.toISOString(),
                updated_at: Hoje.toISOString()
            })
            .eq('id', streak.id);
        return;
    } else {
        // Já possui registro
        const DiaAnterior = new Date(Hoje);
        DiaAnterior.setDate(DiaAnterior.getDate() - 1); // Corrigido o cálculo para o dia anterior

        // Verifica se o DiaAnterior foi domingo (Domingo não conta)
        if (DiaAnterior.getDay() === 0) {
            DiaAnterior.setDate(DiaAnterior.getDate() - 1); // Retrocede para o sábado
        }

        if (UltimoAcesso.toDateString() === Hoje.toDateString()) {
            return; // Se já acessou hoje, nada a fazer
        } else if (UltimoAcesso.toDateString() === DiaAnterior.toDateString()) {
            // Se o último acesso foi no dia anterior
            const NovoStreak = streak.current_streak + 1;
            const StreakMaior = Math.max(NovoStreak, streak.longest_streak);

            await Supra_DataBase.from('streaks')
                .update({
                    current_streak: NovoStreak,
                    longest_streak: StreakMaior,
                    last_open_date: Hoje.toISOString(),
                    updated_at: Hoje.toISOString()
                })
                .eq('id', streak.id);
            return;
        } else {
            // Pulou mais de um dia
            await Supra_DataBase.from('streaks')
                .update({
                    current_streak: 0,
                    last_open_date: Hoje.toISOString(),
                    updated_at: Hoje.toISOString()
                })
                .eq('id', streak.id);
            return;
        }
    }
}

const Adicionar_Leitura_Usuario = async (req: Request, res: Response): Promise<Response> => {
    const { email, id } = req.body;

    try {
        const Usuario: Usuario = await Obter_por_email(email);
        const Streak: Streak = await Obter_streak_pelo_Userid(Usuario.id);

        // Atualizar streak antes de retornar a resposta
        await Atualizar_streak(Streak);

        return res.status(200).send();
    } catch (error: unknown) {
        // Verificar se o erro é uma instância de Error
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }

        // Caso o erro não seja uma instância de Error, trata-se de um erro inesperado
        return res.status(500).send({ message: 'Erro desconhecido' });
    }
}

export default {
    Adicionar_Leitura_Usuario
}
