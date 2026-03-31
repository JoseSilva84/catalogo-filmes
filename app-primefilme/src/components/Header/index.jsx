import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmesContext } from '../../context/FilmesContext';
import './header.css';
import Input from './input';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setFilmes, searchTerm, setSearchTerm } = useContext(FilmesContext);
  const timeoutRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  const debounceSearch = (term) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      if (term.length < 3) {
        setFilmes([]);
        return;
      }
      try {
        setIsSearching(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=deac86272a92449f6c91e3fc36684014&language=pt-BR&query=${encodeURIComponent(term)}&page=1`
        );
        const data = await response.json();
        setFilmes(data.results || []);
      } catch (error) {
        console.error('Erro na busca:', error);
        setFilmes([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header>
      <div className="header-inner">
        <Link className="logo" to="/">
          Catálogo Prime <span className="dot" />
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-menu">
          <Input />
          <Link className="btn-nav btn-primary" to="/favoritos">♥ Meus Filmes</Link>
          <input
            type="text"
            placeholder="Pesquisar filme por nome..."
            value={searchTerm}
            onChange={(e) => {
              const newTerm = e.target.value;
              setSearchTerm(newTerm);
              debounceSearch(newTerm);
            }}
            className="input-search-name"
            disabled={isSearching}
          />
        </nav>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <div className={`menu-icon ${menuOpen ? 'close' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <nav className={`menu-content ${menuOpen ? 'menu-open' : ''}`}>
            <Input />
            <Link className="btn-nav btn-primary" to="/favoritos" onClick={() => setMenuOpen(false)}>♥ Meus Filmes</Link>
            <input
              type="text"
              placeholder="Pesquisar filme por nome..."
              value={searchTerm}
              onChange={(e) => {
                const newTerm = e.target.value;
                setSearchTerm(newTerm);
                debounceSearch(newTerm);
              }}
              className="input-search-name"
              disabled={isSearching}
            />
            <button className="btn-close-menu" onClick={toggleMenu}>X</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;