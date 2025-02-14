const request = require('supertest');
import Supra_DataBase from '../DataBase/Conection_supra';
import app from '../Server'

describe('Verificar a conexão com o dataset', () => {
    it("Deve conectar ao banco de dados e buscar usuários", async () => {
        const { data, error } = await Supra_DataBase.from('users').select('*');

        console.log(data, error)

        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
    });
});

const MandarData = async (Email: string, id: number) => {
    const { data, error } = await request(app)
        .post('/User/NovaLeitura')
        .send({ Email, id })

    console.log(`RETORNO DO ENDPOINT: ${data} || ${error}`)
    return [data, error]
}

it("'ler' com algum e-mail", async () => {
    const [data, error] = await MandarData('teste@example.com', 2)
    console.log(data)

    if (data !== null) {
        expect(error).toBeNull();
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].nome).toBe('Usuário Teste');
    } else {
        throw new Error("Data é nulo")
    }
});
