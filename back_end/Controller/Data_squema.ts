export interface Usuario{
    id:number,
    email:string,
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

/*
-- Tabela para armazenar qual e quando o usuario leu alguma newsletter
CREATE TABLE newsletter_opens (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    edition_id TEXT NOT NULL,
    opened_at TIMESTAMP DEFAULT NOW()
);


-- Tabela para armazenar dados UTM das campanhas
CREATE TABLE utm_data (
    id SERIAL PRIMARY KEY,
    open_id INT REFERENCES newsletter_opens(id) ON DELETE CASCADE,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_channel TEXT
);

-- Tabela para métricas do dashboard administrativo
CREATE TABLE admin_dashboard (
    id SERIAL PRIMARY KEY,
    total_users INT DEFAULT 0,
    total_opens INT DEFAULT 0,
    avg_streak INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW()
);

*/