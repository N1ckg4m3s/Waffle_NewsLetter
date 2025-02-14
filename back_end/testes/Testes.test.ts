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

const MandarData = async (Nome: string, Email: string, Senha: string) => {
    const { data, error } = await request(app)
        .post('/User/AdicionarUsuario')
        .send({ Nome, Email, Senha })

    console.log(`RETORNO DO ENDPOINT: ${data} || ${error}`)
    return [data, error]
}

describe('Testar inserção de usuário', () => {
    it('Sem nome', async () => {
        const [data, error] = await MandarData(
            '',
            '123@email.com',
            'senha'
        )

        // Verificar se houve erro
        expect(error).toBeDefined();
        expect(error).not.toBeNull();

        if (typeof error === 'string') {
            expect(error.length).toBeGreaterThan(0);
        } else if (error instanceof Error) {
            expect(error.message).toBeDefined();
        }
    })

    it('Sem email', async () => {
        const [data, error] = await MandarData(
            'NomeTeste',
            '',
            'senha'
        )

        // Verificar se houve erro
        expect(error).toBeDefined();
        expect(error).not.toBeNull();

        if (typeof error === 'string') {
            expect(error.length).toBeGreaterThan(0);
        } else if (error instanceof Error) {
            expect(error.message).toBeDefined();
        }
    })

    it('Sem senha', async () => {
        const [data, error] = await MandarData(
            'NomeTeste',
            'EmailTeste@Email.com',
            ''
        )

        // Verificar se houve erro
        expect(error).toBeDefined();
        expect(error).not.toBeNull();

        if (typeof error === 'string') {
            expect(error.length).toBeGreaterThan(0);
        } else if (error instanceof Error) {
            expect(error.message).toBeDefined();
        }
    })

    it('Com ingection', async () => {
        const [data, error] = await MandarData(
            "NomeTeste'; DROP TABLE users; --",
            'Emai@.com',
            'senha'
        )

        // Verificar se houve erro
        expect(error).toBeDefined();
        expect(error).not.toBeNull();

        if (typeof error === 'string') {
            expect(error.length).toBeGreaterThan(0);
        } else if (error instanceof Error) {
            expect(error.message).toBeDefined();
        }
    })

    it('Email irrelevante', async () => {
        const [data, error] = await MandarData(
            "NomeTeste'; DROP TABLE users; --",
            'Batatapalha',
            'senha'
        )
        // Verificar se houve erro
        expect(error).toBeDefined();
        expect(error).not.toBeNull();

        if (typeof error === 'string') {
            expect(error.length).toBeGreaterThan(0);
        } else if (error instanceof Error) {
            expect(error.message).toBeDefined();
        }
    })

    it("Tudo certinho", async () => {
        const [data, error] = await MandarData(
            "Usuário Teste",
            'teste@example.com',
            'teste'
        )

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
});