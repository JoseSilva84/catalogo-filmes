import './header.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import { toast } from "react-toastify";


const Input = () => {
    const [nome, setNome] = useState("");
    const [input, setInput] = useState("");
    const { id } = useParams();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'deac86272a92449f6c91e3fc36684014',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setInput(response.data);
            })
            .catch(() => {
                console("Filme não foi encontrado");
            })
        }

        loadFilme();
    }, [id]);

    function pesquisarFilme () {
        // toast.success("Você digitou: " + nome.toLowerCase());
        if(nome.toLowerCase() === "missão refúgio"){
            toast.success("Você selecionou o filme 'Missão Refúgio'")
        } else {toast.error("O filme não está na lista")};
    };

    return ( 
        <div>
            <input type="text" placeholder='ano' value={nome} onChange={(e) => setNome(e.target.value)} className='inputHeader'/>
            <button className='button-input' onClick={pesquisarFilme}>Pesquisar</button>
        </div>

     );
}
 
export default Input;