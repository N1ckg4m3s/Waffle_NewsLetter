# Gamificação em The News

## Descrição
Este é um projeto de gamificação para o site **The News**, onde os usuários podem interagir com notícias e ganhar pontos ao realizar ações específicas. O projeto visa oferecer uma experiência mais envolvente e divertida aos leitores de notícias.

## Tecnologias Utilizadas
- **Frontend:**
  - React
  - TypeScript
  - Chart.js (para gráficos)
  - React Router (para navegação entre páginas)
  - Axios (para requisições API)
  
- **Backend:**
  - Supabase (para gerenciamento de dados)
  - TypeScript
  - Vercel (para hospedagem serverless)
  
## Estrutura do Projeto

### Backend
O backend é focado no Vercel e utiliza uma arquitetura serverless para gerenciar as funções de API. O backend é responsável por autenticar usuários, registrar leituras de notícias e fornecer dados para o frontend.

#### Endpoints:
- **/api/User/Verificar_Email**: Verifica se o email existe no banco de dados para dar acesso ao dashboard (props: email)
- **/api/User/NovaLeitura**: Notifica o sistema que o usuário leu uma notícia (props: email, id, utm_source, utm_medium, utm_campaign, utm_channel)
- **/api/User/DashboardData**: Retorna dados para o frontend montar o dashboard (props: email)
- **/api/Adm/DashboardData**: Retorna dados gerais para gerar gráficos no frontend (sem props)

### Frontend
O frontend é desenvolvido em React e TypeScript, com foco na visualização de notícias e interação do usuário com a plataforma, além de gerar gráficos baseados nos dados do backend.

#### Funcionalidades:
- Dashboard do Cliente: Exibe um painel personalizado para o usuário, com gráficos e métricas baseadas nas leituras das notícias, como o número de notícias lidas, pontos acumulados, e ações realizadas.
- Dashboard do Administrador: Oferece uma visão geral dos dados, incluindo gráficos e métricas sobre o comportamento dos usuários, como o total de leituras, usuários ativos e outras estatísticas importantes.
- Autenticação e Login: Sistema de login para que os usuários possam acessar seu dashboard pessoal. O login é realizado com o e-mail e a autenticação é feita via backend para verificar a existência do e-mail no banco de dados.

## Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/N1ckg4m3s/Waffle_NewsLetter.git
   ```

2. Instale as dependências [front]:
   ```bash
   cd front_end
   npm install
   ```
   [back]
   ```bash
   cd back_end
   npm install
   ```

3. Para rodar localmente [front]:
   ```bash
   npm run start
   ```
   [back]
   ```bash
   vercel dev
   ```

4. estará disponível em:
   [front] http://localhost:3001
   [back] http://localhost:3000

## Links de Hospedagem
Frontend: https://waffle-news-letter.vercel.app/

Backend: https://waffle-news-letter-backend.vercel.app/

Portfólio: https://vercel.com/n1ckg4m3s-projects

## Repositório
https://github.com/N1ckg4m3s/Waffle_NewsLetter

## Como Contribuir
Fork o repositório.
Crie uma branch para a sua feature (git checkout -b feature/nova-funcionalidade).
Commit suas mudanças (git commit -am 'Adiciona nova funcionalidade').
Push para a branch (git push origin feature/nova-funcionalidade).
Abra um pull request.

## Licença
Este código está licenciado sob uma licença proprietária. Todos os direitos são reservados para [seu nome ou nome da empresa].
