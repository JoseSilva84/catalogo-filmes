import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css';

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const carrosselRef = useRef(null);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'deac86272a92449f6c91e3fc36684014',
                    language: 'pt-BR',
                    page: 1
                }
            });
            setFilmes(response.data.results.slice(0, 15));
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
            <div className="carrossel-header">
                <h2 className="carrossel-titulo">Em cartaz agora</h2>
                <div className="carrossel-controles">
                    <button onClick={() => scrollCarrossel('esquerda')} aria-label="Anterior">←</button>
                    <button onClick={() => scrollCarrossel('direita')} aria-label="Próximo">→</button>
                </div>
            </div>

            <div className="lista-filmes" ref={carrosselRef}>
                {filmes.map((filme) => (
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