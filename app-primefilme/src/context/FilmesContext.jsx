import { createContext, useState } from 'react';

export const FilmesContext = createContext();

export const FilmesProvider = ({ children }) => {
  const [filmes, setFilmes] = useState([]);
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');

  return (
    <FilmesContext.Provider value={{ filmes, setFilmes, ano, setAno, genero, setGenero }}>
      {children}
    </FilmesContext.Provider>
  );
};
