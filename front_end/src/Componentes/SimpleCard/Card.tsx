import './Card.css'

interface RankProps {
    Titulo: string;
    Valor: string;
}

const Dashboard_SimpleCard: React.FC<RankProps> = ({ Titulo, Valor }) => {
    return (
        <div className="SimpleCard FlexCenter">
            <h1 className="CardName">{Titulo}</h1>
            <h3 className="CardValue">{Valor}</h3>
        </div>
    )
}

export default Dashboard_SimpleCard;