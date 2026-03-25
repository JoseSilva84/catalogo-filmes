import { Link } from 'react-router-dom';
import './header.css';
import { useState } from 'react';

import Input from './input';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
            <button className="btn-close-menu" onClick={toggleMenu}>X</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;