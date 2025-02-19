import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import UsuarioController from "../../controller/UsuarioController";
import { Streak, Usuario, UTM_Data } from "../../utilidades/Data_squema";
import { allowCors } from "../../utilidades/cors";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);

    if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    // Extrai os dados de acordo com o método
    const User_Email: string = req.method === "GET" ? req.query.email as string : req.body.email;
    const id_letter: string = req.method === "GET" ? req.query.id as string : req.body.id;

    if (!User_Email || !id_letter) {
        return res.status(400).json({ message: "Email ou Id inválido" });
    }

    const UTM: UTM_Data = {
        utm_source: req.method === "GET" ? req.query.utm_source as string : req.body.utm_source,
        utm_medium: req.method === "GET" ? req.query.utm_medium as string : req.body.utm_medium,
        utm_campaign: req.method === "GET" ? req.query.utm_campaign as string : req.body.utm_campaign,
        utm_channel: req.method === "GET" ? req.query.utm_channel as string : req.body.utm_channel,
    };

    try {
        const Usuario = await UsuarioController.Obter_User_por_email(User_Email);

        if (!Usuario) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Buscar streak em paralelo
        const Streak = await UsuarioController.Obter_streak_pelo_Userid(Usuario.id);

        // Atualizar streak antes de retornar a resposta
        await Promise.all([
            UsuarioController.Atualizar_streak(Streak),
            UsuarioController.Adicionar_letter_historico(Usuario.id, id_letter),
            UsuarioController.Adicionar_UTM(Usuario.id, id_letter, UTM)
        ]);

        res.status(200).json({
            success: true,
            message: "URLs processadas com sucesso"
        });
    } catch (error) {
        console.warn("NovaLeitura WARN", error);

        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Erro desconhecido"
        });
    }
}
