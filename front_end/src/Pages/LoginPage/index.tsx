import React, { useState } from "react";
import './index.css';

import WaffleIcon from '../../Icones/WaffleIcon.svg'
import { LoadingStatus } from "../../controller/types";


const LoginPage: React.FC = () => {
    // Tipando o estado de Carregando_Status
    const [MensageServer, SetMensageServer] = useState<string>('');
    const [Carregando_Status, SetCarregando_Status] = useState<LoadingStatus>(LoadingStatus.Espera);

    // Tipando a função SubmitForm
    const SubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email: string = form.email.value.toLowerCase();

        const FetchUrl = `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_URL_VERIFICAR_EMAIL}?email=${email}`;

        SetCarregando_Status(LoadingStatus.Carregando); // Muda para Carregando

        try {
            const response = await fetch(FetchUrl, { method: "GET" });

            if (!response.ok) {
                throw new Error(`Erro no servidor: ${response.status}`);
            }

            const data = await response.json();

            localStorage.setItem('UserEmail', data)
            SetCarregando_Status(LoadingStatus.Sucesso);

            window.location.href = '/Dashboard'

        } catch (e: unknown) {
            SetMensageServer('Email não reconhecido');
            SetCarregando_Status(LoadingStatus.Erro);
        }
    };

    return (
        <div className="DivContainer FlexCenter">
            <form className="Formulario_Login FlexCenter" onSubmit={SubmitForm}>
                <div className={`IconeLogo FlexCenter`}>
                    <img src={WaffleIcon} alt="Waffle Icon" className={Carregando_Status === LoadingStatus.Carregando ? 'AnimandoWaffle' : ''} />
                </div>

                <h2>ENTRE PARA VER MAIS NOTICIAS</h2> {/* bold  20px */}

                <input placeholder="EMAIL" type="email" name="email" id="login_input_email" />

                <button type="submit">ACESSAR</button>

                <h5>Não possui acesso? <span>Registre-se</span> fique até 10% mais conectado ao mundo</h5>

                <h4 className="AvisoServer">{MensageServer}</h4>
            </form>
        </div>
    );
}

export default LoginPage;
