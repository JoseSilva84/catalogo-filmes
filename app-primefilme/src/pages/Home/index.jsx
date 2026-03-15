import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

// URL da AI: 'movie/now_playing?api_key=deac86272a92449f6c91e3fc36684014&language=pt-BR'

const Home = () => {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'deac86272a92449f6c91e3fc36684014',
                    language: 'pt-BR',
                    page: 1
                }
            })
            setFilmes(response.data.results.slice(0, 10));
        }

        loadFilmes();
        setLoading(false);
    }, []);

    if (loading){
        return (
            <div className="loading">
                <h2>Carregando...</h2>
            </div>
        )
    };

    return ( 
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Home;