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

/*
{
  "EstatisticasCampanha": [
    {
      "utm_source": "sla...";
      "utm_medium": null;
      "utm_campaign": null;
      "utm_channel": null
    };
  ];
  "EstatisticasNoticias": {
    "leituras_7_dias": [
      {
        "edition_id": "5";
        "count": 4
      };
    ];
    "mais_lida": {
      "edition_id": string;
      "count": number
    };
    "menos_lida": {
      "edition_id": string;
      "count": number
    }
  };
  "EstatisticasGerais": {
    "total_users": number;
    "total_opens": number;
    "avg_streak": number;
    "porcentagemAbertura": number
  };
  "Rank10": [
    {
      "user_id": number;
      "longest_streak": number
    };
  ]
}

*/