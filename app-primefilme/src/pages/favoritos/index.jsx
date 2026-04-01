import { useState } from "react";
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

// Função segura para obter favoritos do localStorage
const getFavoritosFromStorage = () => {
    try {
        const minhaLista = localStorage.getItem("@primefilmes");
        if (!minhaLista) return [];
        const parsed = JSON.parse(minhaLista);
        // Validação básica: garantir que é um array
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        // Se houver erro no parse, retorna array vazio
        console.error('Erro ao parsear lista de favoritos:', e);
        return [];
    }
};

const Favoritos = () => {
    const [filme, setFilmes] = useState(getFavoritosFromStorage);

    function apagarFilme (id){
        let filtroFilmes =filme.filter((item) => {
            return (item.id !== id);
        })
        setFilmes(filtroFilmes);
        localStorage.setItem("@primefilmes", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!");
    };

    return ( 
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {filme.length === 0 && <span className="semFilme">Você não tem nenhum filme😞</span>}

            <ul>
                {filme.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() =>apagarFilme(item.id)}>Remover</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>

     );
}
 
export default Favoritos;