import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UserDashboardController from "../../controller/UserDashboardController";
import UsuarioController from "../../controller/UsuarioController";
import { Usuario } from "../../utilidades/Data_squema";


export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method == 'GET') {
        const User_Email: string = req.query.email as string;

        try {
            const Data: Usuario = await UsuarioController.Obter_User_por_email(User_Email)
            if (Data) {
                res.status(200).send(Data.email);
            } else {
                res.status(500).send({ mensagem: 'E-mail inexistente' });
            }
        } catch (e) {
            res.status(500).send({ Error: 'Erro desconhecido: ' + e });
        }
    }
}