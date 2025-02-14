import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

// Obter o acesso do Supra do .env
const Supra_Url: string = process.env.Supra_Url || '';
const Supra_Key: string = process.env.Supra_Key || '';

// Verificar se tem algum valor nas vareaveis para ter conexão com o Supra
if (!Supra_Key || !Supra_Url) {
    throw new Error('Supra_Url ou Supra_Key não estão configuradas no .env')
}

// Conectar com o Supra
const Supra_DataBase = createClient(Supra_Url, Supra_Key);

// Testar se foi conectado da forma exata obtendo os users.
async function Testar_Conexao() {
    const { data, error } = await Supra_DataBase.from('users').select('*');

    if (error) console.error('Erro ao conectar:', error);

    else console.log('Conexão bem-sucedida:', data);
}

Testar_Conexao();

export default Supra_DataBase;