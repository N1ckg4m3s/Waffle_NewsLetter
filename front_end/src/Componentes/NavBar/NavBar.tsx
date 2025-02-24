import React from "react"
import WaffleIcon from '../../Icones/WaffleIcon.svg'

import Badge1 from '../../Icones/Bedge1.svg'
import Badge2 from '../../Icones/Bedge2.svg'
import Badge3 from '../../Icones/Bedge3.svg'
import Badge4 from '../../Icones/Bagde4.svg'

import './NavBar.css'

interface NavProps {
    userEmail: string
    userStreak: number
}
interface BadgeQuants {
    badge: string | any,
    AcimaDe: number
}

const BadgeQuants = [
    { badge: Badge1, AcimaDe: 0 },
    { badge: Badge2, AcimaDe: 5 },
    { badge: Badge3, AcimaDe: 20 },
    { badge: Badge4, AcimaDe: 50 },
];

const BadgeDecisor = (Streak: number): { badgeImg: any, progressPercentage: number } => {
    let selectedBadge = Badge1; // Começa com a primeira badge
    let currentThreshold = 0;
    let nextThreshold = 5;

    for (let i = 0; i < BadgeQuants.length; i++) {
        if (Streak >= BadgeQuants[i].AcimaDe) {
            selectedBadge = BadgeQuants[i].badge;
            currentThreshold = BadgeQuants[i].AcimaDe;

            if (i + 1 < BadgeQuants.length) {
                nextThreshold = BadgeQuants[i + 1].AcimaDe;
            } else {
                nextThreshold = Streak; 
            }
        }
    }

    // Se for a última badge, progressPercentage sempre será 100%
    const isLastBadge = selectedBadge === BadgeQuants[BadgeQuants.length - 1].badge;
    const progressPercentage = isLastBadge 
        ? 100 
        : Math.min(100, ((Streak - currentThreshold) / (nextThreshold - currentThreshold)) * 100);

    return { badgeImg: selectedBadge, progressPercentage };
};


const NavBar: React.FC<NavProps> = ({ userEmail, userStreak }) => {

    const { badgeImg, progressPercentage } = BadgeDecisor(userStreak);

    console.log(userStreak, badgeImg, progressPercentage)

    return (
        <nav className="FlexCenter" style={{ flexDirection: 'row' }}>

            {userEmail ? <div className="Email_User">{userEmail}</div> : <span />}

            <img src={WaffleIcon} alt="Waffle Icon" />

            {userStreak > 0 ?
                <div className="ProgressBar">
                    <div className="Badge FlexCenter">
                        <img src={badgeImg} alt="" />
                    </div>
                    <div className="Progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                : <span />
            }
        </nav>
    )
}

export default NavBar