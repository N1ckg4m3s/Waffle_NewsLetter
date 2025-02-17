import Supra_DataBase from '../DataBase/Conection_supra';
import { DatabaseResponse, Streak, Usuario, UTM_Data } from '../utilidades/Data_squema';
import utilits from '../utilidades/utilits';

const Obter_streak_pelo_Userid = async (id: number): Promise<Streak> => {
    const { data, error } = await Supra_DataBase
        .from('streaks')
        .select('*')
        .eq('user_id', id)
        .single();

    if (error || !data) {
        // Caso não tenha o registro, cria um novo
        const Hoje = new Date().toISOString(); // Obtendo a data atual no formato ISO
        const { data: newdata, error: insertError } = await Supra_DataBase
            .from('streaks')
            .insert([{
                user_id: id,
                current_streak: 0,
                longest_streak: 0,
                last_open_date: Hoje,
                updated_at: Hoje
            }])
            .select('*').
            single();

        if (insertError || !newdata) throw new Error('Erro ao criar novo registro de streak');

        return newdata;
    };

    return data;
}

const Atualizar_streak = async (streak: Streak) => {
    const Hoje: Date = new Date();
    const UltimoAcesso = streak.last_open_date ? new Date(streak.last_open_date) : null;

    if (!UltimoAcesso) {
        // Não tem registro, iniciar com 1
        const { data, error } = await Supra_DataBase
            .from('streaks')
            .update({
                current_streak: 1,
                last_open_date: Hoje.toISOString(),
                updated_at: Hoje.toISOString()
            })
            .eq('id', streak.id);

        if (error) throw new Error('Erro ao adicionar primeiro registro do usuario')

        return;
    } else {
        // Já possui registro
        const DiaAnterior = new Date(Hoje);
        DiaAnterior.setDate(DiaAnterior.getDate() - 1); // Corrigido o cálculo para o dia anterior

        // Verifica se o DiaAnterior foi domingo (Domingo não conta)
        if (!(UltimoAcesso.toDateString() === DiaAnterior.toDateString())) {
            if (DiaAnterior.getDay() === 0) {
                DiaAnterior.setDate(DiaAnterior.getDate() - 1); // Retrocede para o sábado
            }
        }

        if (UltimoAcesso.toDateString() === Hoje.toDateString()) {
            return; // Se já acessou hoje, nada a fazer

        } else if (UltimoAcesso.toDateString() === DiaAnterior.toDateString()) {
            // Se o último acesso foi no dia anterior
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

            if (error) throw new Error('Erro ao atualizar streak do usuario')

            console.info('Tudo certo :)')
            return;
        } else {
            console.warn('o usuario deixou passar 1 dia')
            // Pulou mais de um dia
            const { data, error } = await Supra_DataBase.from('streaks')
                .update({
                    current_streak: 0,
                    last_open_date: Hoje.toISOString(),
                    updated_at: Hoje.toISOString()
                })
                .eq('id', streak.id);

            if (error) throw new Error('Erro ao zerar streak do usuario')

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

    // Se o usuário já leu, apenas retorna
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

    if (insertError) throw new Error('Erro ao criar novo registro no historico');
};

const Adicionar_UTM = async (user_id: number, Edicao_id: string, UTM: UTM_Data) => {
    const { data, error } = await Supra_DataBase
        .from('utm_data')
        .select('*')
        .eq('user_id', user_id)
        .eq('edition_id', Edicao_id)
        .single();

    // já ajudou com o UTM
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
    if (utilits.isValidInput(email) || !utilits.ValidateEmail(email)) throw new Error('Email invalido');

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

        if (AddData) {
            return AddData
        } else {
            throw new Error('Não foi possivel criar o email.')
        }
    };

    return data;
}

export default {
    Obter_streak_pelo_Userid,
    Obter_User_por_email,
    Atualizar_streak,
    Adicionar_letter_historico,
    Adicionar_UTM,
}
