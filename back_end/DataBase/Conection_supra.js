import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const Supra_Url = process.env.Supra_Url;
const Supra_Key = process.env.Supra_Key;

const Supra_DataBase = createClient(Supra_Url , Supra_Key);

// Testando a conexão
async function Testar_Conexao() {
    const { data, error } = await Supra_DataBase.from('users').select('*');
    
    if (error) console.error('Erro ao conectar:', error);

    else console.log('Conexão bem-sucedida:', data);
}

Testar_Conexao();

export default Supra_DataBase;