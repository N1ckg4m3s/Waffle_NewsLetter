import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UsuarioController from "../../controller/UsuarioController";
import { Streak, Usuario, UTM_Data } from "../../utilidades/Data_squema";
import { allowCors } from "../../utilidades/cors";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);
    if (req.method == 'GET') {
        const User_Email: string = req.query.email as string;
        const id_letter: string = req.query.id as string;

        const UTM = new UTM_Data()
        UTM.utm_source = req.query.utm_source as string
        UTM.utm_medium = req.query.utm_medium as string
        UTM.utm_campaign = req.query.utm_campaign as string
        UTM.utm_channel = req.query.utm_channel as string

        try {
            const Usuario: Usuario = await UsuarioController.Obter_User_por_email(User_Email);
            const Streak: Streak = await UsuarioController.Obter_streak_pelo_Userid(Usuario.id);

            // Atualizar streak antes de retornar a resposta
            await UsuarioController.Atualizar_streak(Streak);
            
            await UsuarioController.Adicionar_letter_historico(Usuario.id, id_letter);
            
            await UsuarioController.Adicionar_UTM(Usuario.id, id_letter, UTM)
            res.status(200).json({ ok: true });

        } catch (error: unknown) {

            res.status(404).json({ message: error });
        }
    }
}