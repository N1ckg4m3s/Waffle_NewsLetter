import React from "react"
import './Hist.css'

interface HistProps {
    edition_id: string,
    opened_at: string
}

const HistRow: React.FC<HistProps> = ({ edition_id, opened_at }) => {
    const ArrumandoData: Date = new Date(opened_at)

    const DiaLido: number = ArrumandoData.getDate()
    const MesLido: number = ArrumandoData.getMonth() + 1
    const AnoLido: number = ArrumandoData.getFullYear()

    const DiaPublicado: number = 1;
    const MesPublicado: number = 1;
    const AnoPublicado: number = 1912;

    return (
        <li className="HistContainer">
            <h3 className="NoticiaNome">Noticia: {edition_id}</h3>
            <div>
                <h4>
                    {DiaLido <= 9 ? `0${DiaLido}` : DiaLido}/
                    {MesLido <= 9 ? `0${MesLido}` : MesLido}/
                    {AnoLido}
                </h4>
                <h4>
                    {DiaPublicado <= 9 ? `0${DiaPublicado}` : DiaPublicado}/
                    {MesPublicado <= 9 ? `0${MesPublicado}` : MesPublicado}/
                    {AnoPublicado}</h4>
            </div>
        </li>
    )
}

export default HistRow