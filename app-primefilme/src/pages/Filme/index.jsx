import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
                navigate("/", {replace: true});
                return;
            })
        }
        
        loadFilme();
    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primefilmes");
        let filmeSalvo = JSON.parse(minhaLista) || [];

        const hasFilme = filmeSalvo.some((filmeItem) => filmeItem.id === filme.id);

        if(hasFilme){
            alert("Esse filme já estar na lista");
            return;
        }
        filmeSalvo.push(filme);
        localStorage.setItem("@primefilmes", JSON.stringify(filmeSalvo));
        alert("Filme foi salvo com sucesso!");
    };

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }

    return ( 
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Nota: {filme.vote_average.toFixed(1)} /10</strong>
            
            <div className="area-button">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title}Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
     );
}
 
export default Filme;