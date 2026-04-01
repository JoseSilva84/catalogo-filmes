import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import './filme.css';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Filme = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [streamings, setStreamings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            try {
                const [filmeRes, providersRes] = await Promise.all([
                    api.get(`/movie/${id}`, {
                        params: {
                            api_key: TMDB_API_KEY,
                            language: 'pt-BR',
                        }
                    }),
                    api.get(`/movie/${id}/watch/providers`, {
                        params: {
                            api_key: TMDB_API_KEY,
                        }
                    })
                ]);

                setFilme(filmeRes.data);
                const providers = providersRes.data.results?.BR?.flatrate || [];
                setStreamings(providers);
                setLoading(false);
            } catch {
                console.log("Filme não foi encontrado");
                navigate("/", { replace: true });
            }
        }

        loadFilme();
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primefilmes");
        let filmeSalvo = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvo.some((filmeItem) => filmeItem.id === filme.id);

        if (hasFilme) {
            toast.warn("Esse filme já está na lista");
            return;
        }
        filmeSalvo.push(filme);
        localStorage.setItem("@primefilmes", JSON.stringify(filmeSalvo));
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="loading">
                <span className="spinner" />
                Carregando detalhes...
            </div>
        );
    }

    return (
        <div className="filme-info">
            <div className="thumb-wrap">
                <img
                    src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`}
                    alt={filme.title}
                />
            </div>

            <h1>{filme.title}</h1>
            <h3>Direção · {filme.release_date?.slice(0, 4)}</h3>

            <div className="meta">
                <span>{filme.vote_average?.toFixed(1)} ★</span>
                <span>{filme.runtime} min</span>
                {filme.genres?.slice(0, 2).map(g => (
                    <span key={g.id}>{g.name}</span>
                ))}
            </div>

            <div className="divider" />

            <p className="sinopse">{filme.overview}</p>

            <div className="divider" />

            <div className="area-button">
                <button className="btn-primary" onClick={salvarFilme}>
                    + Salvar
                </button>

                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://youtube.com/results?search_query=${encodeURIComponent(filme.title)} Trailer`}
                    className="btn-secondary"
                >
                    ▶ Trailer
                </a>

                {streamings.length > 0 && (
                    <div className="streamings">
{streamings.map((s) => {
                            const getPlatformUrl = (id) => {
                                const urls = {
                                    8: 'https://www.netflix.com/title/search?query=',
                                    9: 'https://www.primevideo.com/search/ref=atv_nb_sr?phrase=',
                                    337: 'https://www.disneyplus.com/pt-br/search?q=',
                                    1893: 'https://www.max.com/br/pt/search?q=',
                                    484: 'https://www.claro.com.br/tv',
                                    2: 'https://tv.apple.com/br/search?term=',
                                };
                                return urls[id] || 'https://www.justwatch.com/br/busca?q=';
                            };
                            const platformUrl = getPlatformUrl(s.provider_id) + encodeURIComponent(filme.title);
                            return (
                                <a
                                    key={s.provider_id}
                                    href={platformUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Assistir em ${s.provider_name}`}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w45${s.logo_path}`}
                                        alt={s.provider_name}
                                        className="streaming-logo"
                                    />
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Filme;