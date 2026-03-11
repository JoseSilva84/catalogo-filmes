import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da AI: movie/now_playing?api_key=deac86272a92449f6c91e3fc36684014&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;