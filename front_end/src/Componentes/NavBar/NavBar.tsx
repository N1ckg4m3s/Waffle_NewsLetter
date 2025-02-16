import React from "react"
import WaffleIcon from '../../Icones/WaffleIcon.svg'

import Bagde1 from '../../Icones/Bedge1.svg'
import Bagde2 from '../../Icones/Bedge2.svg'
import Bagde3 from '../../Icones/Bedge3.svg'
import Bagde4 from '../../Icones/Bagde4.svg'

import './NavBar.css'

interface NavProps {
    userEmail: string
    userStreak: number
}
interface BadgeQuants {
    badge: string,
    AcimaDe: number
}

const BadgeQuants: Array<BadgeQuants> = [
    { badge: 'Bagde1', AcimaDe: 0 },
    { badge: 'Bagde2', AcimaDe: 5 },
    { badge: 'Bagde3', AcimaDe: 20 },
    { badge: 'Bagde4', AcimaDe: 50 },
]

const BadgeDecisor = (Streak: number): { badgeImg: string, progressPercentage: number } => {
    let selectedBadge = Bagde1; // Padrão
    let nextThreshold = 5; // Primeiro limite da Badge 2

    for (let i = 0; i < BadgeQuants.length; i++) {
        if (Streak >= BadgeQuants[i].AcimaDe) {
            // Define a badge atual
            switch (BadgeQuants[i].badge) {
                case 'Bagde1':
                    selectedBadge = Bagde1;
                    break;
                case 'Bagde2':
                    selectedBadge = Bagde2;
                    break;
                case 'Bagde3':
                    selectedBadge = Bagde3;
                    break;
                case 'Bagde4':
                    selectedBadge = Bagde4;
                    break;
            }

            // Define o próximo limite, se houver
            if (i + 1 < BadgeQuants.length) {
                nextThreshold = BadgeQuants[i + 1].AcimaDe;
            } else {
                nextThreshold = Streak; // Evita divisão por zero quando não há próximo
            }
        }
    }

    // Calcula a % de progresso para a próxima badge
    const progressPercentage = Math.min(100, ((Streak - (nextThreshold - 5)) / (nextThreshold - (nextThreshold - 5))) * 100);

    return { badgeImg: selectedBadge, progressPercentage };
};


const NavBar: React.FC<NavProps> = ({ userEmail, userStreak }) => {

    const { badgeImg, progressPercentage } = BadgeDecisor(userStreak);

    return (
        <nav className="FlexCenter" style={{ flexDirection: 'row' }}>
            <div className="Email_User">{userEmail}</div>

            <img src={WaffleIcon} alt="Waffle Icon" />

            <div className="ProgressBar">
                <div className="Badge FlexCenter">
                    <img src={badgeImg} alt="" />
                </div>
                <div className="Progress" style={{width: `${progressPercentage}%`}}></div>
            </div>
        </nav>
    )
}

export default NavBar