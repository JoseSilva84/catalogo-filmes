import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './header.css';

const Input = () => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [input, setInput] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function loadFilme() {
      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: 'deac86272a92449f6c91e3fc36684014',
            language: 'pt-BR',
          },
        });
        setInput(response.data);
      } catch (error) {
        console.error('Filme não foi encontrado:', error);
      }
    }

    loadFilme();
  }, [id]);

  const pesquisarFilme = () => {
    if (nome.toLowerCase() === 'missão refúgio') {
      toast.success("Você selecionou o filme 'Missão Refúgio'");
    } else {
      toast.error('O filme não está na lista');
    }
  };

  return (
    <div className="input-search-wrapper">
      <input
        type="text"
        placeholder="ano"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input-header"
      />
      <input
        type="text"
        placeholder="gênero"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="input-genre"
      />
      <button className="btn-search" onClick={pesquisarFilme}>
        Pesquisar
      </button>
    </div>
  );
};

export default Input;