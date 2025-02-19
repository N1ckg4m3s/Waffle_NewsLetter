import React from "react"
import { ADM_Utm_Data } from "../../controller/types"
import { Pie } from "react-chartjs-2"
import './style.css'
interface Props {
    Lista: Array<ADM_Utm_Data>
    Filtro: keyof ADM_Utm_Data
}

const GraficoPie: React.FC<Props> = ({ Lista, Filtro }) => {
    // Passo 1: Filtrar valores válidos
    const valoresValidos = Lista.map(item => item[Filtro])
        .filter((valor): valor is string => Boolean(valor)); // Remove nulos e strings vazias

    // Passo 2: Criar labels únicos (valores distintos)
    const labels = Array.from(new Set(valoresValidos));

    // Passo 3: Contar quantas vezes cada label aparece
    const data = labels.map(label => valoresValidos.filter(item => item === label).length);

    return (
        <div className="PieDiv">
            <h3 style={{textAlign:'center'}}>Gráfico de {Filtro}</h3>
            <Pie
                data={{
                    labels,
                    datasets: [
                        {
                            data,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8A2BE2"]
                        }
                    ]
                }}
            />
        </div>
    );
};

export default GraficoPie;