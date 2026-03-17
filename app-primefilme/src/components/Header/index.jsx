import { Link } from 'react-router-dom';
import './header.css';

import Input from './input';

const Header = () => {
  return (
    <header>
      <div className="header-inner">
        <Link className="logo" to="/">
          Prime Filme <span className="dot" />
        </Link>
        <nav>
          <Link className="btn-nav" to="/">Início</Link>
          <Link className="btn-nav btn-primary" to="/favoritos">♥ Meus Filmes</Link>
          <Input />
        </nav>
      </div>
    </header>
  );
};

export default Header;