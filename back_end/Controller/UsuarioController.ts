import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, Streak, Usuario, UTM_Data } from '../utilidades/Data_squema';
import utilits from '../utilidades/utilits';

// Função para obter a data atual em formato ISO
const getCurrentDateISO = (): string => new Date().toISOString();

const Obter_streak_pelo_Userid = async (id: number): Promise<Streak> => {
    const { data, error } = await Supra_DataBase
        .from('streaks')
        .select('*')
        .eq('user_id', id)
        .single();

    if (error || !data) {
        // Caso não tenha o registro, cria um novo
        const Hoje = getCurrentDateISO();
        const { data: newdata, error: insertError } = await Supra_DataBase
            .from('streaks')
            .insert([{
                user_id: id,
                current_streak: 0,
                longest_streak: 0,
                last_open_date: Hoje,
                updated_at: Hoje
            }])
            .select('*')
            .single();

        if (insertError || !newdata) throw new Error('Erro ao criar novo registro de streak');

        return newdata;
    }

    return data;
}

const Atualizar_streak = async (streak: Streak) => {
    const Hoje: Date = new Date();
    const UltimoAcesso = streak.last_open_date ? new Date(streak.last_open_date) : null;

    if (!UltimoAcesso) {
        const { data, error } = await Supra_DataBase
            .from('streaks')
            .update({
                current_streak: 1,
                last_open_date: Hoje.toISOString(),
                updated_at: Hoje.toISOString()
            })
            .eq('id', streak.id);

        if (error) throw new Error('Erro ao adicionar primeiro registro do usuário');

        return;
    } else {
        const DiaAnterior = new Date(Hoje);
        DiaAnterior.setDate(DiaAnterior.getDate() - 1);

        if (!(UltimoAcesso.toDateString() === DiaAnterior.toDateString())) {
            if (DiaAnterior.getDay() === 0) {
                DiaAnterior.setDate(DiaAnterior.getDate() - 1);
            }
        }

        if (UltimoAcesso.toDateString() === Hoje.toDateString()) {
            return;
        } else if (UltimoAcesso.toDateString() === DiaAnterior.toDateString()) {
            const NovoStreak = streak.current_streak + 1;
            const StreakMaior = Math.max(NovoStreak, streak.longest_streak);

            const { data, error } = await Supra_DataBase.from('streaks')
                .update({
                    current_streak: NovoStreak,
                    longest_streak: StreakMaior,
                    last_open_date: Hoje.toISOString(),
                    updated_at: Hoje.toISOString()
                })
                .eq('id', streak.id);

            if (error) throw new Error('Erro ao atualizar streak do usuário');

            return;
        } else {
            console.warn('O usuário deixou passar 1 dia');
            const { data, error } = await Supra_DataBase.from('streaks')
                .update({
                    current_streak: 0,
                    last_open_date: Hoje.toISOString(),
                    updated_at: Hoje.toISOString()
                })
                .eq('id', streak.id);

            if (error) throw new Error('Erro ao zerar streak do usuário');

            return;
        }
    }
}

const Adicionar_letter_historico = async (Id_User: number, Id_Letter: string) => {
    const { data, error } = await Supra_DataBase
        .from('newsletter_opens')
        .select('*')
        .eq('user_id', Id_User)
        .eq('edition_id', Id_Letter)
        .single();

    if (data && !error) return;

    const Hoje: Date = new Date();
    const { data: AddedData, error: insertError } = await Supra_DataBase
        .from('newsletter_opens')
        .insert([{
            user_id: Id_User,
            edition_id: Id_Letter,
            opened_at: Hoje.toISOString()
        }])
        .select('*');

    if (insertError) throw new Error('Erro ao criar novo registro no histórico');
};

const Adicionar_UTM = async (user_id: number, Edicao_id: string, UTM: UTM_Data) => {
    const { data, error } = await Supra_DataBase
        .from('utm_data')
        .select('*')
        .eq('user_id', user_id)
        .eq('edition_id', Edicao_id)
        .single();

    if (data && !error) return;

    const { data: AddedData, error: insertError } = await Supra_DataBase
        .from('utm_data')
        .insert([{
            edition_id: Edicao_id,
            user_id: user_id,
            utm_source: UTM.utm_source,
            utm_medium: UTM.utm_medium,
            utm_campaign: UTM.utm_campaign,
            utm_channel: UTM.utm_channel
        }])
        .select('*');

    if (insertError) throw new Error('Erro ao criar novo registro do UTM');
}

const Obter_User_por_email = async (email: string): Promise<Usuario> => {
    if (!utilits.isValidInput(email) || !utilits.ValidateEmail(email)) throw new Error('Email invalido');

    const { data, error }: DatabaseResponse<Usuario> = await Supra_DataBase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        const Hoje: Date = new Date();
        const { data: AddData, error: AddError }: DatabaseResponse<Usuario> = await Supra_DataBase
            .from('users')
            .insert([{
                email: email,
                created_at: Hoje.toISOString()
            }])
            .select('*')
            .single();

        if (AddError || !AddData) throw new Error('Não foi possível criar o usuário');

        return AddData;
    }

    return data;
}

export default {
    Obter_streak_pelo_Userid,
    Obter_User_por_email,
    Atualizar_streak,
    Adicionar_letter_historico,
    Adicionar_UTM,
};
