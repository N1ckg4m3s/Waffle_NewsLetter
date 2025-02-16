import { VercelResponse } from "@vercel/node/dist";

export function allowCors(res: VercelResponse) {
    res.setHeader("Access-Control-Allow-Origin", "*");  // Permite acesso de qualquer origem
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");  // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");  // Cabeçalhos permitidos
}
