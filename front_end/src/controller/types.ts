export enum Bagdes {
    Comum = 'Badge1',
    Ve_as_vezes = 'Badge2',
    Leitor = 'Badge3',
    Viciado = 'Badge4',
}
export enum LoadingStatus {
    Espera = 'Espera',
    Carregando = 'Carregando',
    Erro = 'Erro',
    Sucesso = 'Sucesso'
}

export interface RankingUserInterface {
    id: string;
    user_id: number;
    current_streak: number;
    last_open_date: string;
    longest_streak: number;
    updated_at: string
}
export interface HistoricoDataInterface {
    id: number;
    user_id: string;
    edition_id: string;
    opened_at: string;
}
export interface StreakDataInterface {
    Streak_Atual: number;
    Streak_Atualizado: string;
    Streak_Maior: number;
}
export interface RetornoApiInterface {
    Historico: Array<HistoricoDataInterface>;
    RankingUsuarios: Array<RankingUserInterface>;
    StreakData: StreakDataInterface
}

