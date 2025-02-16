import React, { useEffect, useState } from "react";
import './Estilo.css'

import WaffleIcon from '../../Icones/WaffleIcon.svg'

const FrasesMotivacionaisBasica: string[] = [
    "Pequenos passos diários constroem grandes conquistas.",
    "Mantenha o ritmo, um dia de cada vez.",
    "O progresso é feito na consistência, não na perfeição.",
    "Uma streak não se trata de números, mas do compromisso com seu objetivo.",
    "Cada dia consecutivo é um voto de confiança no seu futuro.",
    "Não quebre a corrente, sua disciplina vale mais do que sua motivação.",
    "Você já começou, agora faça valer a pena continuar.",
    "Persistência transforma esforço em hábito e hábito em excelência.",
    "O segredo do sucesso não é a intensidade, mas a continuidade.",
    "A jornada pode ser longa, mas cada passo te aproxima do seu objetivo.",
    "A disciplina pesa gramas, o arrependimento pesa toneladas.",
    "Foque no processo e o resultado virá naturalmente.",
    "Nada muda se você não mudar.",
    "A excelência não é um ato, mas um hábito diário.",
    "A consistência é o que transforma boas intenções em grandes conquistas.",
    "O sucesso não vem da motivação, mas da disciplina diária.",
    "Progresso é progresso, não importa o quão pequeno seja.",
    "Não espere pelo momento perfeito, comece e melhore no caminho.",
    "Cada dia é uma nova chance para continuar evoluindo.",
    "O esforço de hoje constrói o sucesso de amanhã."
];

const Motivacional: React.FC = () => {
    const [frase, setFrase] = useState<string>("");

    useEffect(() => {
        // Seleciona uma frase aleatória ao montar o componente
        const fraseAleatoria = FrasesMotivacionaisBasica[Math.floor(Math.random() * FrasesMotivacionaisBasica.length)];
        setFrase(fraseAleatoria);
    }, []);

    return (
        <div className="DivContainer FlexCenter ContainerMensagens">
            <div className={`IconeLogo FlexCenter`}>
                <img src={WaffleIcon} alt="Waffle Icon" />
            </div>
            <h2>{frase}</h2>

            <div className="SecondAnimation">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Motivacional;
