const BASE_URL = "http://localhost:3000";

const UrlList = {
    Verificar_Email: `${BASE_URL}/api/User/Verificar_Email`,
    NovaLeitura: `${BASE_URL}/api/User/NovaLeitura`,
    DashboardData: `${BASE_URL}/api/User/DashboardData`,
    AdmDashboardData: `${BASE_URL}/api/Adm/DashboardData`
};

// Função auxiliar para verificar a resposta da API
const checkApiResponse = async (
    url: string,
    params: string,
    expectedStatus: number,
    expectedResponse: any // O tipo `any` pode ser usado aqui para permitir a flexibilidade da resposta JSON.
): Promise<void> => {
    try {
        const response = await fetch(url + params, { method: 'GET' });
        expect(response.status).toBe(expectedStatus);
        const responseJson = await response.json();
        expect(responseJson).toEqual(expectedResponse);
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

// Testando a API do User - Verificar Existência de um Email
describe('Testando API do User - Verificar Existencia de um email', () => {
    test("Email Aleatorio", async () => {
        const email = 'aleatorio@aleatorio.com';
        await checkApiResponse(`${UrlList.Verificar_Email}`, `?email=${email}`, 404, {
            "message": "E-mail inexistente"
        });
    });

    test("Email com injection", async () => {
        const email = '-- OR 1==1';
        await checkApiResponse(`${UrlList.Verificar_Email}`, `?email=${email}`, 404, {
            "message": "E-mail inexistente"
        });
    });

    test("Email correto", async () => {
        const email = 'teste@teste.com';
        await checkApiResponse(`${UrlList.Verificar_Email}`, `?email=${email}`, 200, { email: email });
    });
})

// Registrar nova leitura de notícia
describe('Registrar nova leitura de notícia', () => {
    test('Sem Email', async () => {
        await checkApiResponse(`${UrlList.NovaLeitura}`, `?email=&id=`, 400, {
            "message": "Email ou Id inválido"
        });
    });

    test('Sem ID', async () => {
        const email = 'teste@teste.com';
        await checkApiResponse(`${UrlList.NovaLeitura}`, `?email=${email}&id=`, 400, {
            "message": "Email ou Id inválido"
        });
    });

    test('Correto [UTM PODE SER NULL]', async () => {
        const email = 'teste@teste.com';
        const id_teste = 'letter_000_00_1';
        await checkApiResponse(`${UrlList.NovaLeitura}`, `?email=${email}&id=${id_teste}`, 200, {
            "success": true,
            "message": "URLs processadas com sucesso"
        });
    });
});

// Obter Dashboard do usuário
describe('Obter Dashboard usuario', () => {
    test('Sem Email', async () => {
        await checkApiResponse(`${UrlList.DashboardData}`, `?email=`, 400, {
            "message": "Email inexistente"
        });
    });

    test('Email Aleatorio', async () => {
        const email = 'aleatorio@aleatorio.com';
        await checkApiResponse(`${UrlList.DashboardData}`, `?email=${email}`, 500, {
            message: 'Erro ao buscar usuário'
        });
    });

    test('Tudo Certinho', async () => {
        const email = 'teste@teste.com';
        const response = await fetch(`${UrlList.DashboardData}?email=${email}`, { method: 'GET' });

        expect(response.status).toBe(200);
        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('StreakData');
        expect(responseJson).toHaveProperty('Historico');
        expect(responseJson).toHaveProperty('RankingUsuarios');
    });
});

// Testes gerais
describe('Testes gerais', () => {
    test('Obter as estatísticas de ADM', async () => {
        const response = await fetch(UrlList.AdmDashboardData, { method: 'GET' });

        expect(response.status).toBe(200);
        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('EstatisticasCampanha');
        expect(responseJson).toHaveProperty('EstatisticasNoticias');
        expect(responseJson).toHaveProperty('EstatisticasGerais');
        expect(responseJson).toHaveProperty('Rank10');
    });

    test('Obter estatísticas de ADM com datas específicas', async () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 10);
        const endDate = new Date();

        const response = await fetch(`${UrlList.AdmDashboardData}?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`, { method: 'GET' });
        expect(response.status).toBe(200);
        const responseJson = await response.json();

        expect(responseJson).toHaveProperty('EstatisticasCampanha');
        expect(responseJson).toHaveProperty('EstatisticasNoticias');
        expect(responseJson).toHaveProperty('EstatisticasGerais');
        expect(responseJson).toHaveProperty('Rank10');
    });

    test('Acessar uma página inexistente', async () => {
        const response = await fetch(`${BASE_URL}/Api/Inexist`, { method: 'GET' });
        expect(response.status).toBe(404);
    });

    test('Simular requisições simultâneas', async () => {
        const emails = ['teste@teste.com', 'texte@exemple.com', 'teste2@teste.com'];

        const responses = await Promise.all(
            emails.map(email =>
                fetch(`${UrlList.Verificar_Email}?email=${email}`, { method: 'GET' })
            )
        );

        responses.forEach(response => expect(response.status).toBe(200));

        const jsonResponses = await Promise.all(responses.map(res => res.json()));

        jsonResponses.forEach((responseJson, index) => {
            expect(responseJson).toEqual({email: emails[index]});
        });
    });

    test('Testar resposta ao passar intervalo inválido de datas', async () => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() - 10);

        const response = await fetch(`${UrlList.AdmDashboardData}?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`, { method: 'GET' });
        expect(response.status).toBe(400);
    });
});
