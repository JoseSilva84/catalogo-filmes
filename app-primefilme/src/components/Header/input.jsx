import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FilmesContext } from "../../context/FilmesContext";
import api from "../../services/api";
import "./header.css";

const Input = () => {
  const { ano, setAno, genero, setGenero, setFilmes } = useContext(FilmesContext);
  const [generos, setGeneros] = useState([]);
  const [carregandoGeneros, setCarregandoGeneros] = useState(true);

  // Buscar lista de gêneros ao montar o componente
  useEffect(() => {
    async function carregarGeneros() {
      try {
        const response = await api.get("/genre/movie/list", {
          params: {
            api_key: "deac86272a92449f6c91e3fc36684014",
            language: "pt-BR",
          },
        });
        setGeneros(response.data.genres);
        setCarregandoGeneros(false);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
        setCarregandoGeneros(false);
      }
    }
    carregarGeneros();
  }, []);

  async function pesquisaFilme() {
    if (!ano) {
      toast.error(`Digite um ano para a pesquisa!`);
      return;
    }
    try {
      const response = await api.get("/discover/movie", {
        params: {
          api_key: "deac86272a92449f6c91e3fc36684014",
          language: "pt-BR",
          primary_release_year: ano,
          with_genres: genero || undefined, // Usa o ID do gênero se selecionado
        },
      });
      setFilmes(response.data.results);
      const nomeGenero = generos.find(g => g.id.toString() === genero)?.name || "";
      const mensagem = nomeGenero 
        ? `Filmes de ${nomeGenero} do ano ${ano} encontrados!` 
        : `Filmes do ano ${ano} encontrados!`;
      toast.success(mensagem);
    } catch (error) {
      toast.error("Filme não foi encontrado:", error);
    }
  }

  return (
    <div className="input-search-wrapper">
      <input
        type="text"
        placeholder="ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        className="input-header"
      />
      <select
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="input-genre"
        disabled={carregandoGeneros}
      >
        <option value="">Todos os gêneros</option>
        {generos.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <button className="btn-search" onClick={pesquisaFilme}>
        Pesquisar
      </button>
    </div>
  );
};

export default Input;
