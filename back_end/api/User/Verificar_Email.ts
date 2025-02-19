import { VercelRequest, VercelResponse } from "@vercel/node/dist";
import Supra_DataBase from "../../DataBase/Conection_supra";
import { allowCors } from "../../utilidades/cors";
import { Usuario } from "../../utilidades/Data_squema";
import { DatabaseResponse } from "../../utilidades/Data_squema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    allowCors(res);

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const User_Email: string | undefined = req.query.email as string;

    if (!User_Email) {
        return res.status(400).json({ message: "Parâmetro 'email' é obrigatório" });
    }

    try {
        const { data, error }: DatabaseResponse<Usuario> = await Supra_DataBase
            .from('users')
            .select('email')
            .eq('email', User_Email)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: 'E-mail inexistente' });
        }

        res.status(200).json({ email: data.email });
    } catch (e) {
        console.error('Erro ao buscar usuário:', e);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
