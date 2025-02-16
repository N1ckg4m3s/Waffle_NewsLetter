import React from "react"
import "./Rank.css"

import WaffleOuro from '../../Icones/Waffle_Ouro.svg'
import WafflePrata from '../../Icones/Waffle_Aluminio.svg'
import WaffleBronse from '../../Icones/Waffle_Bronse.svg'

interface RankProps {
    rank: number;
    user_id: number;
    current_streak: number;
}

const Rankrow: React.FC<RankProps> = ({ rank, user_id, current_streak }) => {
    return (
        <li className="RankContainer"
            style={{
                backgroundColor:
                    rank == 0 ? '#ffe36f80' :
                        rank == 1 ? '#d1d1d180' :
                            rank == 2 ? '#ffbe8580' :
                                "transparent"
            }}
        >
            {rank == 0 ? <img className="Classification_Icon" src={WaffleOuro} alt='' /> : null}
            {rank == 1 ? <img className="Classification_Icon" src={WafflePrata} alt='' /> : null}
            {rank == 2 ? <img className="Classification_Icon" src={WaffleBronse} alt='' /> : null}

            <h3 className="NomeUser">User: {user_id}</h3>

            <h3 className="StreakUser">{current_streak}</h3>
        </li>
    )
}

export default Rankrow