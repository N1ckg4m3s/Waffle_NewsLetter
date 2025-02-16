import React, { useState } from "react";
import './index.css';

// Enum para os estados de carregamento
enum LoadingStatus {
    Espera = 'Espera',
    Carregando = 'Carregando',
    Erro = 'Erro',
    Sucesso = 'Sucesso'
}

const DashboardPage: React.FC = () => {

    const [userLevel, setuserLevel] = useState<number>(0);
    const [userStreak, setuserStreak] = useState<number>(0);
    const [maxStreak, setmaxStreak] = useState<number>(0);

    const [ranking, setRanking] = useState<Map<string, number>>(new Map());

    // Estado para o histórico de edições abertas
    const [historico, setHistorico] = useState<Array<{ edition_id: string, opened_at: string }>>([]);


    return (
        <div className="DivContainer FlexCenter">
            
        </div>
    );
}

export default DashboardPage;
