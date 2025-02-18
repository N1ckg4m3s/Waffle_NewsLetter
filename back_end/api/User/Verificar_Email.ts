import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UserDashboardController from "../../controller/UserDashboardController";
import UsuarioController from "../../controller/UsuarioController";
import { DatabaseResponse, Usuario } from "../../utilidades/Data_squema";
import { allowCors } from "../../utilidades/cors";
import Supra_DataBase from "../../DataBase/Conection_supra";


export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);
    if (req.method == 'GET') {
        const User_Email: string = req.query.email as string;

        try {
            const { data, error }: DatabaseResponse<Usuario> = await Supra_DataBase
                .from('users')
                .select('*')
                .eq('email', User_Email)
                .single();

            if (data) {
                res.status(200).json(data.email);
            } else {
                res.status(400).json({ message: 'E-mail inexistente' });
            }
        } catch (e) {
            res.status(400).json({ message: 'Erro desconhecido: ' + e });
        }
    }
}