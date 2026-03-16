import { useState, useEffect} from "react";
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Favoritos = () => {
    const [filme, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primefilmes");
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

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

            {filme.length === 0 && <span>Você não tem nenhum filme😞</span>}

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