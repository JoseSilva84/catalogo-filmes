import api from './api.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const LANGUAGE = 'pt-BR';
const DEFAULT_PAGE = 1;
const MAX_RESULTS = 30;

if (!API_KEY) {
  console.error('TMDB API key não configurada. Defina VITE_TMDB_API_KEY no arquivo .env');
}

/**
 * Busca filmes populares do TMDB
 */
export async function getPopularMovies(page = DEFAULT_PAGE) {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page
      }
    });
    return response.data.results.slice(0, MAX_RESULTS);
  } catch (error) {
    console.error('Erro ao buscar populares:', error);
    throw error;
  }
}

/**
 * Busca filmes mais bem avaliados
 */
export async function getTopRatedMovies(page = DEFAULT_PAGE) {
  try {
    const response = await api.get('/movie/top_rated', {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page
      }
    });
    return response.data.results.slice(0, MAX_RESULTS);
  } catch (error) {
    console.error('Erro ao buscar top rated:', error);
    throw error;
  }
}

/**
 * Busca filmes em cartaz agora
 */
export async function getNowPlayingMovies(page = DEFAULT_PAGE) {
  try {
    const response = await api.get('/movie/now_playing', {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page
      }
    });
    return response.data.results.slice(0, MAX_RESULTS);
  } catch (error) {
    console.error('Erro ao buscar now playing:', error);
    throw error;
  }
}

/**
 * Busca filmes similares a um filme específico
 */
export async function getSimilarMovies(movieId, page = DEFAULT_PAGE) {
  try {
    const response = await api.get(`/movie/${movieId}/similar`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE,
        page
      }
    });
    return response.data.results.slice(0, MAX_RESULTS);
  } catch (error) {
    console.error('Erro ao buscar similares:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um filme (para consistência)
 */
export async function getMovieDetails(movieId) {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: LANGUAGE
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes:', error);
    throw error;
  }
}