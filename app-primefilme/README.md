# Catálogo Prime Filmes

Um catálogo de filmes moderno e responsivo que utiliza a API do TMDB (The Movie Database).

## 🚀 Tecnologias Utilizadas

- React 19
- Vite 7
- React Router DOM 7
- Axios
- React Toastify

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/JoseSilva84/catalogo-filmes.git
cd app-primefilme
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Substitua `sua_chave_api_aqui` pela sua chave de API do TMDB

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave:
```
VITE_TMDB_API_KEY=sua_chave_api_aqui
```

Para obter uma chave de API do TMDB:
1. Acesse [The Movie Database](https://www.themoviedb.org/)
2. Crie uma conta
3. Vá para Configurações > API e gere sua chave

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run lint` - Executa o linter
- `npm run preview` - Preview da build de produção

## 📁 Estrutura do Projeto

```
app-primefilme/
├── public/
├── src/
│   ├── components/
│   │   └── Header/
│   ├── context/
│   │   └── FilmesContext.jsx
│   ├── pages/
│   │   ├── Erro/
│   │   ├── favoritos/
│   │   ├── Filme/
│   │   └── Home/
│   ├── services/
│   │   ├── api.jsx
│   │   └── tmdb.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── routes.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## 🔒 Segurança

Este projeto implementa as seguintes práticas de segurança:

- **Variáveis de ambiente**: A chave da API TMDB é armazenada em variáveis de ambiente e não é exposta no código-fonte
- **Headers de segurança**: Meta tags de segurança no HTML (X-Content-Type-Options, X-Frame-Options, etc.)
- **Validação de dados**: Validação de dados do localStorage para prevenir erros de parse
- **Links seguros**: Todos os links externos utilizam `rel="noopener noreferrer"`
- **.env no .gitignore**: Arquivos de ambiente são ignorados pelo Git

## 🌐 Build de Produção

Para criar uma build de produção otimizada:

```bash
npm run build
```

Os arquivos da build serão gerados na pasta `dist/`.

Para visualizar a build de produção localmente:

```bash
npm run preview
```

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

José Silva - [github.com/JoseSilva84](https://github.com/JoseSilva84)