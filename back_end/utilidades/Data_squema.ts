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