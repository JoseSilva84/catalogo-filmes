import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmesContext } from '../../context/FilmesContext';
import api from '../../services/api';
import './home.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
    const [filmesPadrao, setFilmesPadrao] = useState([]);
    const [loading, setLoading] = useState(true);
  const { filmes: filmesPesquisa, ano, searchTerm } = useContext(FilmesContext);
    const carrosselRef = useRef(null);

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