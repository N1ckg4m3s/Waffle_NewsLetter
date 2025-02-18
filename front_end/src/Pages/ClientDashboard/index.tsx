import React, { useEffect, useState } from "react";
import NavBar from "../../Componentes/NavBar/NavBar";
import HistRow from "../../Componentes/HistoricoItem/Hist";
import Rankrow from "../../Componentes/RankItem/Rank";
import Foguinho from '../../Icones/Foguinho.svg'
import {
    Bagdes, RankingUserInterface,
    HistoricoDataInterface, StreakDataInterface,
    RetornoApiInterface
} from "../../controller/types";

import './index.css';
import { useNavigate } from "react-router-dom";
import Motivacional from "../../Componentes/MotivacionalPage/Motivacional";

const FetchUrl = `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_URL_DASHBOARD_DATA}`;

const DashboardPage: React.FC = () => {

    const navigate = useNavigate()

    const [DadosCarregado, setDadosCarregado] = useState<boolean>(false);

    const [userEmail, setuseruserEmail] = useState<string>('');

    const [userStreak, setuserStreak] = useState<string>('');
    const [maxStreak, setmaxStreak] = useState<string>('');

    const [ranking, setRanking] = useState<Array<RankingUserInterface>>([]);

    // Estado para o histórico de edições abertas
    const [historico, setHistorico] = useState<Array<HistoricoDataInterface>>([]);

    const ObterDadosFetch = async (Email: string) => {
        try {
            setuseruserEmail(Email)

            const response = await fetch(`${FetchUrl}?email=${Email}`, { method: 'GET' })

            if (!response.ok) {
                throw new Error(`Erro no servidor: ${response.status}`);
            }

            // Salvar todo o retorno da api
            const RetornoApi: RetornoApiInterface = await response.json();

            // Gerenciar a StreakData
            const StreakData: StreakDataInterface = RetornoApi.StreakData

            setuserStreak(String(StreakData.Streak_Atual))
            setmaxStreak(String(StreakData.Streak_Maior))

            setHistorico(RetornoApi.Historico)

            setRanking(RetornoApi.RankingUsuarios)

            setDadosCarregado(true)

        } catch (e: unknown) {
            setuseruserEmail('Erro ao conectar com o servidor')
            setuserStreak('##')
            setmaxStreak('##')
            setRanking([])
            setHistorico([])
        }
    }
    useEffect(() => {
        const Email: (string | null) = localStorage.getItem('UserEmail')

        if (!Email) navigate("/");
        else ObterDadosFetch(Email)

    }, [])

    // if (!DadosCarregado) return (<Motivacional />)

    return !DadosCarregado ? <Motivacional />: (
        <div className="DivContainer FlexCenter" style={{ justifyContent: 'start' }}>
            <NavBar userEmail={userEmail} userStreak={Number.parseInt(userStreak)} />

            <section className="StreakContainer FlexCenter" style={{ flexDirection: 'row' }}>
                <div className="Streak FlexCenter">
                    <img src={Foguinho} alt="" />
                    <div className="StreakNumber FlexCenter">{userStreak} <span>Streaks</span></div>
                </div>
                <div className="FraseMotivacional">
                    A cada dia o Streak aumenta vamos ver em qual nivel voce consegue chegar?
                </div>
            </section>
            
            <section className="Hist_Rank_Section">
                <article className="Hist_Article FlexCenter">
                    <h2 className="FlexCenter" style={{ backgroundColor: '#E159FF' }}>Histórico</h2>
                    <ul>
                        {historico.map((hist, index) => (
                            <HistRow
                                key={index}
                                edition_id={hist.edition_id}
                                opened_at={hist.opened_at}
                            />
                        ))}
                    </ul>
                </article>

                <article className="Rank_Article FlexCenter">
                    <h2 className="FlexCenter" style={{ backgroundColor: '#E8C94F' }}>Ranking</h2>
                    <ul>
                        {ranking.map((rank, index) => (
                            <Rankrow
                                key={index}
                                rank={index}
                                current_streak={rank.current_streak}
                                user_id={rank.user_id}
                            />
                        ))}
                    </ul>
                </article>
            </section>
        </div>
    );
}

export default DashboardPage;
