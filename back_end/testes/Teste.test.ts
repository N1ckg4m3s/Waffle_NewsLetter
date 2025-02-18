const BASE_URL = "http://localhost:3000";

const UrlList = {
    Verificar_Email: `${BASE_URL}/api/User/Verificar_Email`,
    NovaLeitura: `${BASE_URL}/api/User/NovaLeitura`,
    DashboardData: `${BASE_URL}/api/User/DashboardData`,
    AdmDashboardData: `${BASE_URL}/api/Adm/DashboardData`
}


describe('Testando API do User - Verificar Existencia de um email', () => {
    test("Email Aleatorio", async () => {
        const email = 'aleatorio@aleatorio.com'

        const response = await fetch(`${UrlList.Verificar_Email}?email=${email}`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "message": "E-mail inexistente"
        })
    })

    test("Email com ingection", async () => {
        const email = '-- OR 1==1'

        const response = await fetch(`${UrlList.Verificar_Email}?email=${email}`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "message": "E-mail inexistente"
        })
    })

    test("Email correto", async () => {
        const email = 'teste@teste.com'

        const response = await fetch(`${UrlList.Verificar_Email}?email=${email}`, {
            method: 'GET',
        })

        expect(response.status).toBe(200)

        const responseJson = await response.json();

        expect(responseJson).toBe(email)
    })
})

describe('Registrar nova leitura de notícia', () => {
    test('Sem Email', async () => {
        const response = await fetch(`${UrlList.NovaLeitura}?email=&id=`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "mensage": "Email ou Id invalido"
        })
    })

    test('Sem ID', async () => {
        const email = 'teste@teste.com'

        const response = await fetch(`${UrlList.NovaLeitura}?email=${email}&id=`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "mensage": "Email ou Id invalido"
        })
    })

    test('Correto [UTM PODE SER NULL]', async () => {
        const email = 'teste@teste.com'
        const id_teste = 'letter_000_00_1'

        const response = await fetch(`${UrlList.NovaLeitura}?email=${email}&id=${id_teste}`, {
            method: 'GET',
        })

        expect(response.status).toBe(200)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "success": true,
            "message": "URLs processadas com sucesso"
        })
    })
})

describe('Obter Dashboard usuario', () => {
    test('Sem Email', async () => {
        const response = await fetch(`${UrlList.DashboardData}?email=`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({
            "mensage": "Email inexistente"
        })
    })

    test('Email Aleatorio', async () => {
        const email = 'aleatorio@aleatorio.com'
        const response = await fetch(`${UrlList.DashboardData}?email=${email}`, {
            method: 'GET',
        })

        expect(response.status).toBe(400)

        const responseJson = await response.json();

        expect(responseJson).toEqual({ message: 'Usuario inexistente nos registros' })
    }) // Modificando o tempo de espera do Teste

    test('Tudo Certinho', async () => {
        const email = 'teste@teste.com'
        const response = await fetch(`${UrlList.DashboardData}?email=${email}`, {
            method: 'GET',
        })

        expect(response.status).toBe(200)

        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('StreakData')
        expect(responseJson).toHaveProperty('Historico')
        expect(responseJson).toHaveProperty('RankingUsuarios')
    }) // Modificando o tempo de espera do Teste
})

describe('Testes gerais', () => {
    test('Obter as estatisticas de ADM', async () => {
        const response = await fetch(UrlList.AdmDashboardData, {
            method: 'GET',
        })

        expect(response.status).toBe(200)

        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('EstatisticasCampanha')
        expect(responseJson).toHaveProperty('EstatisticasNoticias')
        expect(responseJson).toHaveProperty('EstatisticasGerais')
        expect(responseJson).toHaveProperty('Rank10')
    }) // Modificando o tempo de espera do Teste

    test('Acessar uma pagina inexistente', async () => {
        const email = 'aleatorio@aleatorio.com'
        const response = await fetch(`${BASE_URL}/Api/Inexist`, {
            method: 'GET',
        })

        expect(response.status).toBe(404)
    })

    test('simular requisições simultaneas', async () => {
        const emails = ['teste@teste.com', 'texte@exemple.com', 'teste2@teste.com'];

        const responses = await Promise.all(
            emails.map(email =>
                fetch(`${UrlList.Verificar_Email}?email=${email}`, { method: 'GET' })
            )
        );

        responses.forEach(response => expect(response.status).toBe(200));

        const jsonResponses = await Promise.all(responses.map(res => res.json()));

        jsonResponses.forEach((responseJson, index) => {
            expect(responseJson).toBe(emails[index]);
        });
    }) // Modificando o tempo de espera do Teste
})