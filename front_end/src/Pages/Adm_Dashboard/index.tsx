import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import NavBar from "../../Componentes/NavBar/NavBar";
import Motivacional from "../../Componentes/MotivacionalPage/Motivacional";
import './index.css';
import { ADM_Estatistica_Gerais, ADM_Estatistica_Noticia, ADM_Rank, ADM_Utm_Data, Contagem_Edicao } from "../../controller/types";

import Dashboard_SimpleCard from "../../Componentes/SimpleCard/Card";
import GraficoPie from "../../Componentes/Gerar_Grafico_Pie/Pie";

// Importando DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const FetchUrl = `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_ADM_DASHBOARD}`;

const Adm_Dashboard: React.FC = () => {
    const [dadosCarregados, setDadosCarregados] = useState(true);
    const [historico, setHistorico] = useState<Array<Contagem_Edicao>>([]);
    const [estatisticasNoticias, setEstatisticasNoticias] = useState<ADM_Estatistica_Noticia>({
        leituras_7_dias: [],
        menos_lida: {
            count: 0,
            edition_id: '0'
        },
        mais_lida: {
            count: 0,
            edition_id: '0'
        }
    });
    const [rank10, setRank10] = useState<Array<ADM_Rank>>([]);
    const [estatisticasCampanha, setEstatisticasCampanha] = useState<Array<ADM_Utm_Data>>([]);
    const [estatisticasGerais, setEstatisticasGerais] = useState<ADM_Estatistica_Gerais>({
        avg_streak: 0,
        porcentagemAbertura: 0,
        total_opens: 0,
        total_users: 0
    });

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Função para formatar a data em string para enviar à API
    const formatDate = (date: Date | null) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam do 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const obterDadosFetch = async (startDate: Date | null, endDate: Date | null) => {
        try {
            const response = await fetch(`${FetchUrl}?start_date=${startDate?.toISOString()}&end_date=${endDate?.toISOString()}`, { method: 'GET' });

            if (!response.ok) throw new Error(`Erro no servidor: ${response.status}`);

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
    //     setDadosCarregados(false)
    //     obterDadosFetch(startDate, endDate);
    // });

    const Filtrar = () => {
        setDadosCarregados(false)
        obterDadosFetch(startDate, endDate)
    }

    return !dadosCarregados ? <Motivacional /> : (
            <div className="DivContainer FlexCenter" style={{ justifyContent: 'start' }}>
                <NavBar userEmail="" userStreak={-1} />

                <h2>Filtros de Data</h2>
                <section className="FiltrosData">
                    <h5>Data Início:</h5>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                    />
                    <br />
                    <h5>Data Fim:</h5>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate ? startDate : undefined}
                        maxDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                    />
                    <button onClick={Filtrar}>Filtrar</button>
                </section>

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
                </section>

                <h2>Graficos</h2>
                <section className="Graficos">
                    <section className="Estatisticas_Gerais" style={{ width: 'fit-content' }}>
                        <Dashboard_SimpleCard
                            Titulo="Noticia mais lida"
                            Valor={
                                estatisticasNoticias?.mais_lida
                                    ? `${estatisticasNoticias!.mais_lida.edition_id}: ${estatisticasNoticias!.mais_lida.count} leituras`
                                    : "Nenhuma notícia encontrada"
                            }
                        />
                        <Dashboard_SimpleCard
                            Titulo="Noticia menos lida"
                            Valor={
                                estatisticasNoticias?.menos_lida
                                    ? `${estatisticasNoticias!.menos_lida.edition_id}: ${estatisticasNoticias!.menos_lida.count} leituras`
                                    : "Nenhuma notícia encontrada"
                            }
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
        );
};

export default Adm_Dashboard;
