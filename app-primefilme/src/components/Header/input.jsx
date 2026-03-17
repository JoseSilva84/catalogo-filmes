import { useContext } from "react";
import { toast } from "react-toastify";
import { FilmesContext } from "../../context/FilmesContext";
import api from "../../services/api";
import "./header.css";

const Input = () => {
  const { ano, setAno, genero, setGenero, setFilmes } = useContext(FilmesContext);

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
          with_genres: genero,
        },
      });
      setFilmes(response.data.results);
      toast.success(`Filmes do ano ${ano} encontrados com sucesso!`);
    } catch (error) {
      toast.error("Filme não foi encontrado:", error);
    }
  }

  //   const pesquisarFilme = () => {
  //     if (ano === '2016') {
  //       toast.success(`Você selecionou os filmes do ano ${ano}`);
  //     } else {
  //       toast.error(`Os filmes de ${ano} não estão na lista`);
  //     }
  //   };

  return (
    <div className="input-search-wrapper">
      <input
        type="text"
        placeholder="ano"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        className="input-header"
      />
      <input
        type="text"
        placeholder="gênero"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className="input-genre"
      />
      <button className="btn-search" onClick={pesquisaFilme}>
        Pesquisar
      </button>
    </div>
  );
};

export default Input;
