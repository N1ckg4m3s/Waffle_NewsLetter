# Documentação Técnica - Gamificação em The News
## 1. Introdução
### Objetivo
Este projeto visa criar uma plataforma de gamificação para o The News, incentivando os leitores a interagirem com as newsletters e aumentando o engajamento através de streaks (sequência de aberturas consecutivas). Os leitores poderão visualizar seu progresso e as métricas de engajamento, enquanto a equipe da Waffle terá acesso a um painel administrativo para monitorar as estatísticas gerais e os padrões de engajamento.

### Visão Geral do Sistema
A plataforma é composta por duas partes principais:
- Área Logada para Leitores: Onde os leitores podem se logar com seu e-mail, visualizar seu streak atual, histórico de aberturas, e receber mensagens motivacionais para manter o streak.
- Dashboard Administrativo: Onde a equipe da Waffle pode monitorar métricas de engajamento, ver rankings de leitores mais engajados e analisar dados com gráficos.

## 2. Tecnologias Utilizadas
### Frontend
 - React: Biblioteca JavaScript para construção da interface de usuário.
- TypeScript: Superset de JavaScript que oferece tipagem estática e facilita a manutenção.
- Axios: Biblioteca para fazer requisições HTTP à API.
- Chart.js: Biblioteca para criação de gráficos no dashboard administrativo.
- React Router: Para navegação entre páginas.

### Backend
- Supabase: Plataforma backend-as-a-service para gerenciamento de banco de dados e autenticação.
- Vercel: Hospedagem serverless para o backend.
- Banco de Dados
- SQL: O banco de dados é estruturado de maneira relacional, usando Supabase como plataforma para o gerenciamento de dados.

## 3. Arquitetura do Sistema
A arquitetura do sistema é baseada em uma arquitetura client-server com um frontend que consome uma API backend.

- O Frontend foi desenvolvido em React e é responsável por exibir a interface para os leitores e o painel administrativo.
- O Backend é uma API serverless hospedada no Vercel, que gerencia as requisições do sistema e interage com o banco de dados Supabase.
- O Banco de Dados armazena as informações dos leitores, suas leituras de newsletters, e dados para visualização de métricas.

Componentes Principais
- Login e Autenticação de Leitores: Os leitores podem fazer login usando seu e-mail, o qual é validado pela API.
- Exibição de Streaks: O streak do usuário é calculado com base no histórico de aberturas de newsletters.
- Dashboard Administrativo: Exibe métricas e gráficos de engajamento geral, rankings de leitores e filtros por newsletter e período de tempo.

## 4. Estrutura do Banco de Dados
O banco de dados foi estruturado de forma simples e escalável, com as seguintes tabelas principais:

- users: Contém informações dos leitores, como e-mail e streak atual.
- newsletters: Armazena dados sobre cada edição das newsletters, incluindo data de envio e parâmetros UTMs.
- reads: Registra as leituras feitas pelos leitores, com informações de e-mail, id da edição, e os parâmetros UTM.
Escalabilidade
O banco de dados foi projetado para ser escalável, permitindo que novas leituras e usuários sejam facilmente inseridos sem comprometer o desempenho. O uso do Supabase facilita a escalabilidade devido à sua infraestrutura de banco de dados em tempo real.

Consultas e Inserções
As inserções de leituras são feitas automaticamente sempre que um usuário acessa o link de leitura da newsletter.
Consultas são otimizadas para exibir rapidamente os rankings de leitores e as métricas de engajamento.

## 5. API
A API foi desenvolvida para gerenciar as requisições feitas pelo frontend e interagir com o banco de dados.

### Endpoints
- /api/User/Verificar_Email: Verifica se o e-mail do leitor já está registrado no sistema.
    - Parâmetros: email
- /api/User/NovaLeitura: Registra uma nova leitura de newsletter, atualizando o streak do usuário.
    - Parâmetros: email, id (id da edição), utm_source, utm_medium, utm_campaign, utm_channel
- /api/User/DashboardData: Retorna os dados para o frontend exibir o painel de métricas do usuário.
    - Parâmetros: email
- /api/Adm/DashboardData: Retorna dados gerais de engajamento para o painel administrativo.
    - Parâmetros (opcionais):
        - StartDate (string, formato YYYY-MM-DD): Data inicial do intervalo de análise.
        - EndDate (string, formato YYYY-MM-DD): Data final do intervalo de análise.
    - Comportamento:
        - Se nenhuma data for fornecida, o sistema retorna os dados referentes à última semana (últimos 7 dias a partir da data atual).
        - Se StartDate e EndDate forem fornecidos, o sistema retorna os dados dentro desse intervalo.

## 6. Gamificação e Regras de Streak
O sistema de streak é implementado para incentivar a leitura contínua das newsletters.

- Regras do Streak: O streak aumenta em 1 a cada dia consecutivo que o leitor abrir a newsletter. Caso o leitor falhe em abrir em um dia, o streak é resetado.
- Mensagens Motivacionais: São exibidas mensagens personalizadas, incentivando o leitor a manter o streak.
Extras
- Badges e Níveis: Planeja-se a implementação de badges para leitores que completam desafios específicos ou mantêm streaks por períodos mais longos.
- Ranking: O ranking dos leitores mais engajados é exibido no painel administrativo, com filtros para ver o desempenho por período.

## 7. Testes
### Testes Realizados
- Testes de API: Verificação de todos os endpoints da API, validando entradas e saídas corretas.
- Testes de Integração: Testando a integração entre o frontend, backend e banco de dados.
- Testes de Performance: Verificação da performance das consultas SQL, especialmente para os rankings e métricas de engajamento.

### Dificuldades Encontradas
- A integração com o webhook foi um desafio inicial, mas foi resolvido utilizando chamadas de API assíncronas e garantindo a integridade dos dados recebidos.

## 8. Considerações Finais
Desafios Enfrentados
Durante o desenvolvimento, enfrentei diversos desafios que impactaram tanto a organização do código quanto a estrutura do projeto:
- *Hospedagem (Site e Banco de Dados)*: A busca por uma solução acessível e escalável foi um obstáculo, especialmente ao lidar com limitações de serviços gratuitos como o Firebase e o MongoDB Atlas. Além disso, configurar a comunicação entre o frontend e backend hospedados separadamente exigiu ajustes na API.
- *Refatoração do Backend*: Inicialmente, o backend foi desenvolvido utilizando Express, mas devido a dificuldades na integração com a hospedagem na Vercel, precisei migrar para um modelo serverless suportado nativamente pela plataforma. Essa mudança impactou a estrutura das rotas e a forma como os dados eram processados, exigindo uma reescrita significativa do código.
- *Falta de Organização Inicial*: A falta de um planejamento detalhado no início do projeto resultou em retrabalho. Algumas decisões tomadas no início, como a escolha da stack backend, tiveram que ser revistas, o que atrasou a implementação de certas funcionalidades.
- *Testes e Validação*: Passei entre 1 a 2 horas realizando testes para garantir que as respostas da API fossem rápidas e consistentes, ajustando queries e otimizando a forma como os dados eram recuperados. O tempo limitado para testar todas as funcionalidades foi um desafio, especialmente considerando a necessidade de validar a escalabilidade do sistema.
- *Otimização das Respostas*: Garantir que o backend respondesse rapidamente, mesmo com um número crescente de acessos, exigiu otimizações no banco de dados e ajustes na estrutura das APIs. Trabalhei para reduzir tempos de resposta e melhorar a performance das consultas sem comprometer a integridade dos dados.

## 9. Conclusão
Este projeto cumpre o objetivo de aumentar o engajamento dos leitores da newsletter através da gamificação, oferecendo uma experiência interativa e incentivadora. A plataforma oferece um sistema simples e eficaz de acompanhamento de streaks, com um painel administrativo completo para análise de dados de engajamento.