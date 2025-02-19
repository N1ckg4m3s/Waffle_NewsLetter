import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import NavBar from "../../Componentes/NavBar/NavBar";
import Motivacional from "../../Componentes/MotivacionalPage/Motivacional";
import './index.css';
import { ADM_Estatistica_Gerais, ADM_Estatistica_Noticia, ADM_Rank, ADM_Utm_Data, Contagem_Edicao } from "../../controller/types";

import Dashboard_SimpleCard from "../../Componentes/SimpleCard/Card";
import GraficoPie from "../../Componentes/Gerar_Grafico_Pie/Pie";
import Rankrow from "../../Componentes/RankItem/Rank";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const FetchUrl = `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_ADM_DASHBOARD}`;

const GeneratePieinformations = () => { }

const Adm_Dashboard: React.FC = () => {
    const [dadosCarregados, setDadosCarregados] = useState(true);

    const [historico, setHistorico] = useState<Array<Contagem_Edicao>>([
        {
            edition_id: '0',
            count: 0
        }
    ]);
    const [estatisticasNoticias, setEstatisticasNoticias] = useState<ADM_Estatistica_Noticia>({
        leituras_7_dias: [
            {
                "edition_id": "Prod_00_00_3",
                "count": 2
            },
        ],
        mais_lida: {
            "edition_id": "Prod_00_00_3",
            "count": 2
        },
        menos_lida: {
            "edition_id": "Prod_00_00_3",
            "count": 2
        }
    });
    const [rank10, setRank10] = useState<Array<ADM_Rank>>([
        {
            "user_id": 39,
            "longest_streak": 5
        },
    ]);
    const [estatisticasCampanha, setEstatisticasCampanha] = useState<Array<ADM_Utm_Data>>([
        {
            "utm_source": "postman",
            "utm_medium": "Medium",
            "utm_campaign": "nenhuma",
            "utm_channel": "web"
        },
    ]);
    const [estatisticasGerais, setEstatisticasGerais] = useState<ADM_Estatistica_Gerais>({
        "total_users": 4,
        "total_opens": 12,
        "avg_streak": 1.5,
        "porcentagemAbertura": 300
    });

    const obterDadosFetch = async () => {
        try {
            const response = await fetch(FetchUrl, { method: 'GET' });

            if (!response.ok) throw new Error(`Erro no servidor: ${response.status}`);

            console.log(response)
            const dados = await response.json();
            setHistorico(dados.EstatisticasNoticias.leituras_7_dias);
            setEstatisticasNoticias(dados.EstatisticasNoticias);
            setRank10(dados.Rank10);
            setEstatisticasCampanha(dados.EstatisticasCampanha);
            setEstatisticasGerais(dados.EstatisticasGerais);
            setDadosCarregados(true);
        } catch (e) {
            console.error("Erro ao buscar dados:", e);
            setDadosCarregados(false);
        }
    };

    // useEffect(() => {
    //     obterDadosFetch();
    // }, []);

    return !dadosCarregados ? <Motivacional /> : (
        <div className="DivContainer FlexCenter" style={{ justifyContent: 'start' }}>
            <NavBar userEmail="" userStreak={-1} />

            <h2>Estatísticas Gerais</h2>
            <section className="Estatisticas_Gerais">

                <Dashboard_SimpleCard
                    Titulo="Usuarios"
                    Valor={`${estatisticasGerais!.total_users}`}
                />
                <Dashboard_SimpleCard
                    Titulo="Noticias Lidas"
                    Valor={`${estatisticasGerais!.total_opens}`}
                />
                <Dashboard_SimpleCard
                    Titulo="Streak Médio"
                    Valor={`${estatisticasGerais!.avg_streak}`}
                />
                {/* <Dashboard_SimpleCard
                    Titulo="% de ler"
                    Valor={`${estatisticasGerais!.porcentagemAbertura}`}
                /> */}

            </section>

            <h2>Graficos</h2>
            <section className="Graficos">
                <section className="Estatisticas_Gerais" style={{ width: 'fit-content' }}>
                    <Dashboard_SimpleCard
                        Titulo="Noticia mais lida"
                        Valor={`${estatisticasNoticias!.mais_lida.edition_id}: ${estatisticasNoticias!.mais_lida.count} leituras`}
                    />
                    <Dashboard_SimpleCard
                        Titulo="Noticia menos lida"
                        Valor={`${estatisticasNoticias!.menos_lida.edition_id}: ${estatisticasNoticias!.menos_lida.count} leituras`}
                    />
                </section>

                <br />

                <div className="Barra_linha">
                    <Bar
                        data={{
                            labels: historico.map(item => `Edição ${item.edition_id}`),
                            datasets: [
                                {
                                    label: "Leituras",
                                    data: historico.map(item => item.count),
                                    backgroundColor: "rgba(75,192,192,0.6)",
                                }
                            ]
                        }}
                    />
                    <Line
                        data={{
                            labels: rank10.map(item => `User ${item.user_id}`),
                            datasets: [
                                {
                                    label: "Maior Streak",
                                    data: rank10.map(item => item.longest_streak),
                                    backgroundColor: 'blue',
                                    showLine: true,
                                    fill: true
                                }
                            ]
                        }}
                    />
                </div>

                <br />

                <section className="GraficosPizza">
                    <GraficoPie
                        Lista={estatisticasCampanha}
                        Filtro="utm_source"
                    />
                    <GraficoPie
                        Lista={estatisticasCampanha}
                        Filtro="utm_medium"
                    />
                    <GraficoPie
                        Lista={estatisticasCampanha}
                        Filtro="utm_campaign"
                    />
                    <GraficoPie
                        Lista={estatisticasCampanha}
                        Filtro="utm_channel"
                    />

                </section>

            </section>

        </div>
    )
};

export default Adm_Dashboard;
