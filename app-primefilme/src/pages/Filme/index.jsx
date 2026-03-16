import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";
import './filme.css';

const Filme = () => {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'deac86272a92449f6c91e3fc36684014',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não foi encontrado");
                navigate("/", { replace: true });
            })
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
                
                <a target="_blank"
                    rel="external noreferrer"
                    href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                >
                    ▶ Trailer
                </a>
            </div>
        </div>
    );
}

export default Filme;