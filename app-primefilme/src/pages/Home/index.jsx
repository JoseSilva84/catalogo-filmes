import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmesContext } from '../../context/FilmesContext';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './home.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
    const [filmesPadrao, setFilmesPadrao] = useState([]);
    const [loading, setLoading] = useState(true);
  const { filmes: filmesPesquisa, ano, searchTerm } = useContext(FilmesContext);
    const carrosselRef = useRef(null);
    const carrosselAiRef = useRef(null);

    // AI states
    const [showAI, setShowAI] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiMovies, setAiMovies] = useState([]);
    const [loadingAI, setLoadingAI] = useState(false);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: TMDB_API_KEY,
                    language: 'pt-BR',
                    page: 1
                }
            });
            setFilmesPadrao(response.data.results.slice(0, 20));
            setLoading(false);
        }
        loadFilmes();
    }, []);

    function scrollCarrossel(direcao) {
        if (carrosselRef.current) {
            carrosselRef.current.scrollBy({
                left: direcao === 'esquerda' ? -340 : 340,
                behavior: 'smooth'
            });
        }
    }

    async function handleSearchAI(e) {
        e.preventDefault();
        if (!aiPrompt.trim()) {
            toast.warn("Por favor, descreva o filme que deseja procurar.");
            return;
        }
        
        setLoadingAI(true);
        setAiMovies([]);
        
        try {
            const response = await fetch('http://localhost:3001/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt })
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Erro de conexão com o servidor local");
            }
            
            if (data.recommendations && data.recommendations.length > 0) {
                const results = await Promise.all(
                    data.recommendations.map(async (title) => {
                        const tmdbRes = await api.get("search/movie", {
                            params: {
                                api_key: TMDB_API_KEY,
                                query: title,
                                language: 'pt-BR',
                                page: 1
                            }
                        });
                        return tmdbRes.data.results[0]; // pega o primeiro
                    })
                );
                // filtra undefined
                const validMovies = results.filter(Boolean);
                if (validMovies.length > 0) {
                    setAiMovies(validMovies);
                } else {
                    toast.info("A IA recomendou filmes, mas não os encontramos no banco de dados.");
                }
            } else {
                toast.info("A IA não conseguiu encontrar recomendações para isso.");
            }
        } catch (err) {
            console.error("Erro na busca por IA:", err);
            toast.error(err.message === 'Failed to fetch' ? "Servidor local (backend) não está rodando na porta 3001." : `Falha: ${err.message}`);
        } finally {
            setLoadingAI(false);
        }
    }

    function scrollCarrosselAi(direcao) {
        if (carrosselAiRef.current) {
            carrosselAiRef.current.scrollBy({
                left: direcao === 'esquerda' ? -340 : 340,
                behavior: 'smooth'
            });
        }
    }

    if (loading) {
        return (
            <div className="loading">
                <span className="spinner" />
                Carregando filmes...
            </div>
        );
    }

    return (
        <div className="home-wrapper">
            {/* Nova Seção da IA */}
            <div className="ia-section" style={{marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <button 
                  className="btn-ia-toggle" 
                  onClick={() => setShowAI(!showAI)}
                >
                  Procure com IA ✨
                </button>
                
                {showAI && (
                    <form className="ia-form" onSubmit={handleSearchAI}>
                        <input
                            type="text"
                            placeholder="Descreva o que quer assistir (ex: filme de terror no espaço)..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            disabled={loadingAI}
                        />
                        <button type="submit" disabled={loadingAI}>
                            {loadingAI ? 'Buscando...' : 'Buscar'}
                        </button>
                    </form>
                )}
            </div>

            {aiMovies.length > 0 && (
                <div style={{ marginBottom: '40px', marginTop: '20px' }}>
                    <div className="carrossel-header">
                        <h2 className="carrossel-titulo ia-titulo">Sugestões da IA ✨</h2>
                        <div className="carrossel-controles">
                            <button onClick={() => scrollCarrosselAi('esquerda')} aria-label="Anterior">←</button>
                            <button onClick={() => scrollCarrosselAi('direita')} aria-label="Próximo">→</button>
                        </div>
                    </div>
                    <div className="lista-filmes" ref={carrosselAiRef}>
                        {aiMovies.map((filme) => (
                            <article key={filme.id}>
                                <div className="thumb-wrap">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                        alt={filme.title}
                                    />
                                </div>
                                <div className="body">
                                    <strong>{filme.title}</strong>
                                </div>
                                <Link to={`/filme/${filme.id}`}>Acessar →</Link>
                            </article>
                        ))}
                    </div>
                </div>
            )}

    {/* Seção de Resultados da Busca */}
    {filmesPesquisa.length > 0 && (
      <div style={{ marginBottom: '40px' }}>
        <div className="carrossel-header">
          <h2 className="carrossel-titulo">
            {searchTerm ? `Resultados para "${searchTerm}"` : `Resultados da Busca - ${ano}`}
          </h2>
                        <div className="carrossel-controles">
                            <button onClick={() => scrollCarrossel('esquerda')} aria-label="Anterior">←</button>
                            <button onClick={() => scrollCarrossel('direita')} aria-label="Próximo">→</button>
                        </div>
                    </div>

                    <div className="lista-filmes" ref={carrosselRef}>
                        {filmesPesquisa.map((filme) => (
                            <article key={filme.id}>
                                <div className="thumb-wrap">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                        alt={filme.title}
                                    />
                                </div>
                                <div className="body">
                                    <strong>{filme.title}</strong>
                                </div>
                                <Link to={`/filme/${filme.id}`}>Acessar →</Link>
                            </article>
                        ))}
                    </div>
                </div>
            )}

            {/* Seção Original - Em Cartaz Agora */}
            <div className="carrossel-header">
                <h2 className="carrossel-titulo">Em cartaz agora</h2>
                <div className="carrossel-controles">
                    <button onClick={() => scrollCarrossel('esquerda')} aria-label="Anterior">←</button>
                    <button onClick={() => scrollCarrossel('direita')} aria-label="Próximo">→</button>
                </div>
            </div>

            <div className="lista-filmes" ref={carrosselRef}>
                {filmesPadrao.map((filme) => (
                    <article key={filme.id}>
                        <div className="thumb-wrap">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                                alt={filme.title}
                            />
                        </div>
                        <div className="body">
                            <strong>{filme.title}</strong>
                        </div>
                        <Link to={`/filme/${filme.id}`}>Acessar →</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;