export interface Usuario {
    id: number,
    email: string,
    created_at: string // time
}

export interface Streak {
    id: number;
    user_id: number;
    current_streak: number;
    longest_streak: number;
    last_open_date: string; // Date
    updated_at: string; // Timestamp
}

export interface DatabaseResponse<T> {
    data: T | null;
    error: any | null;
}

export class UTM_Data {
    public utm_source: string = ''
    public utm_medium: string = ''
    public utm_campaign: string = ''
    public utm_channel: string = ''
}

export interface AdminDashboardMetrics {
    total_users: number
    total_opens: number
    avg_streak: number
    porcentagemAbertura: number
}

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

export interface ADM_Utm_Data {
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_channel: string | null
}
export interface Contagem_Edicao {
    edition_id: string;
    count: number
}

export interface ADM_Estatistica_Noticia {
    leituras_7_dias: Array<Contagem_Edicao>;
    mais_lida: Contagem_Edicao;
    menos_lida: Contagem_Edicao;
}

export interface ADM_Estatistica_Gerais {
    total_users: number;
    total_opens: number;
    avg_streak: number;
    porcentagemAbertura: number
}
export interface ADM_Rank {
    user_id: number;
    longest_streak: number
}