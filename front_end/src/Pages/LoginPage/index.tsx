import React from "react";
import './index.css';

import WaffleIcon from '../../Icones/WaffleIcon.svg'

const LoginPage = () => {
    return (
        <body className="FlexCenter">
            <form className="Formulario_Login FlexCenter">
                <div className="IconeLogo FlexCenter">
                    <img src={WaffleIcon} alt="Waffle Icon" />
                </div>

                <h2>ENTRE PARA VER MAIS NOTICIAS</h2> {/* bold  20px */}

                <input placeholder="EMAIL" type="email" name="email" id="login_input_email" />

                <button type="submit">ACESSAR</button>

                <h5>Não possui acesso? <span>Registre-se</span> fique até 10% mais conectado ao mundo</h5>
            </form>
        </body>
    );
}

export default LoginPage;
