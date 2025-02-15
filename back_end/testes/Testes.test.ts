const request = require('supertest');
import Supra_DataBase from '../DataBase/Conection_supra';
import app from '../Server'


beforeAll(() => {

})
/* ========== VERIFICA A CONEXÃO COM O BANCO DE DADOS ========== */
describe('Verificar a conexão com o dataset', () => {
    it("Deve conectar ao banco de dados e buscar usuários", async () => {
        const { data, error } = await Supra_DataBase.from('users').select('*');
        expect(data).toBeDefined();
        expect(Array.isArray(data)).toBe(true);
    });
});

/* ========== VERIFICÃO DE EMAIL ========== */
describe('Verificar a existencia de um email', () => {
    /* Bloquear email não cadastrado */
    it('Email Aleatorio', async () => {
        const response = await request(app)
            .get('/User/Verificar_Email')
            .query({ email: 'Email@Random.com' });

        expect(response.status).toBe(500)
    })

    /* Bloquear possivel ingection */
    it('Email ingection 1', async () => {
        const response = await request(app)
            .get('/User/Verificar_Email')
            .query({ email: '-- 1 OR 1;' });

        expect(response.status).toBe(500)
    })

    /* Bloquear possivel ingection junto do email */
    it('Email ingection 2', async () => {
        const response = await request(app)
            .get('/User/Verificar_Email')
            .query({ email: 'teste@example.com -- 1 OR 1;' });

        expect(response.status).toBe(500)
    })

    /* Permitir a entrada de um email cadastrado */
    it('Email cadastrado', async () => {
        const response = await request(app)
            .get('/User/Verificar_Email')
            .query({ email: 'teste@example.com' });

        expect(response.status).toBe(200)
    })
})

const MandarData = async (email: string, id: number) => {
    const response = await request(app)
        .post('/User/NovaLeitura')
        .query({ email, id })
    return response
}

describe("'Ler' com algum email", () => {
    it("e-mail aleatorio", async () => {
        const response = await MandarData('Email@Random.com', 2);

        expect(response.status).toBe(500)
    });

    it("com ingection", async () => {
        const response = await MandarData('-- 1 OR 1;', 2)

        expect(response.status).toBe(500)
    });

    it("com email e ingection", async () => {
        const response = await MandarData('teste@example.com -- 1 OR 1;', 2)

        expect(response.status).toBe(500)
    });

    it("e-mail correto", async () => {
        const response = await MandarData('teste@example.com', 7)

        expect(response.status).toBe(200)
    });
})

// describe('Obter dados do Dashboard [CLIENT]', () => {
//     it('', async () => { })
// })