<div align="center">

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" />
<img src="https://img.shields.io/badge/AI%20Powered-FF6B35?style=for-the-badge&logo=openai&logoColor=white" />
<img src="https://img.shields.io/badge/status-ativo-brightgreen?style=for-the-badge" />

# 🎬 Catálogo de Filmes

**Explore, descubra e organize seus filmes favoritos — com busca inteligente por IA.**

[Ver Demo](#) · [Reportar Bug](https://github.com/JoseSilva84/catalogo-filmes/issues) · [Sugerir Feature](https://github.com/JoseSilva84/catalogo-filmes/issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Demonstração](#-demonstração)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Uso](#-instalação-e-uso)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

O **Catálogo de Filmes** é uma aplicação web moderna desenvolvida em React que permite aos usuários explorar um vasto acervo de filmes consumindo a API do **TMDB (The Movie Database)**. O diferencial da aplicação é a **busca descritiva por IA**: em vez de precisar saber o nome exato do filme, o usuário descreve o que lembra — e a IA encontra o título correspondente.

> *"Aquele filme dos anos 90 onde o cara vê mortos e o final surpreende todo mundo"* → a IA entende e te mostra **O Sexto Sentido**.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔍 **Busca de Filmes** | Pesquise títulos diretamente pelo nome em tempo real |
| 🤖 **Busca por IA** | Descreva o filme com suas palavras e a IA identifica o título |
| 🎭 **Filtro por Gênero** | Navegue por categorias como Ação, Drama, Comédia, Terror e mais |
| 🎞️ **Página de Detalhes** | Visualize sinopse, elenco, avaliação, trailer e informações completas |
| ❤️ **Lista de Favoritos** | Salve os filmes que você ama e acesse sua lista pessoal a qualquer momento |

---

## 🖥️ Demonstração

> 📸 *Screenshots e GIFs do projeto em funcionamento.*

<!-- Substitua pelos caminhos reais das imagens -->
<!-- ![Home](./docs/screenshots/home.png) -->
<!-- ![Busca por IA](./docs/screenshots/ai-search.png) -->
<!-- ![Detalhes do Filme](./docs/screenshots/details.png) -->

---

## 🛠️ Tecnologias

Este projeto foi construído com as seguintes tecnologias:

- **[React](https://reactjs.org/)** — Biblioteca para construção da interface
- **[React Router DOM](https://reactrouter.com/)** — Navegação entre páginas (SPA)
- **[TMDB API](https://www.themoviedb.org/documentation/api)** — Fonte de dados de filmes, séries e elenco
- **[IA Integrada]** — Busca semântica/descritiva de filmes por linguagem natural
- **CSS Modules / Styled Components** — Estilização dos componentes
- **LocalStorage** — Persistência dos favoritos no navegador

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) `>= 16.x`
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma chave de API do **[TMDB](https://www.themoviedb.org/settings/api)** (gratuita)
- Uma chave de API da **IA** utilizada na busca descritiva

---

## 🚀 Instalação e Uso

### 1. Clone o repositório

```bash
git clone https://github.com/JoseSilva84/catalogo-filmes.git
cd catalogo-filmes
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o arquivo `.env` com suas chaves de API (veja a seção abaixo).

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:5173](http://localhost:5173) no seu navegador.

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Chave da API do TMDB
# Obtenha em: https://www.themoviedb.org/settings/api
VITE_TMDB_API_KEY=sua_chave_tmdb_aqui

# Chave da API de IA para busca descritiva
VITE_AI_API_KEY=sua_chave_ai_aqui
```

> ⚠️ **Nunca** versione o arquivo `.env` com suas chaves reais. Ele já está incluído no `.gitignore`.

---

## 📁 Estrutura do Projeto

```
catalogo-filmes/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/           # Imagens e recursos estáticos
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Header/
│   │   ├── MovieCard/
│   │   ├── SearchBar/
│   │   └── GenreFilter/
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home/
│   │   ├── Details/
│   │   └── Favorites/
│   ├── services/         # Integração com APIs externas
│   │   ├── tmdb.js       # Chamadas à API do TMDB
│   │   └── aiSearch.js   # Lógica de busca por IA
│   ├── hooks/            # Custom hooks
│   ├── context/          # Context API (favoritos, estado global)
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um **fork** do projeto
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Faça o **commit** das suas alterações
   ```bash
   git commit -m "feat: adiciona minha feature"
   ```
4. Faça o **push** para a branch
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 📬 Contato

**José Silva** — [@JoseSilva84](https://github.com/JoseSilva84)

Link do projeto: [https://github.com/JoseSilva84/catalogo-filmes](https://github.com/JoseSilva84/catalogo-filmes)

---

<div align="center">

Feito com ❤️ por <a href="https://github.com/JoseSilva84">José Silva</a>

</div>
