import './header.css';
import { Link } from 'react-router-dom';

import Input from './input';

const Header = () => {
  return (
    <header>
      <div className="header-inner">
        <Link className="logo" to="/">
          Prime Filme <span className="dot" />
        </Link>
        <nav>
          <Link className="favoritos" to="/">Início</Link>
          <Link className="favoritos btn-primary" to="/favoritos">♥ Meus Filmes</Link>
          <Input></Input>
        </nav>
      </div>
    </header>
  );
}

export default Header;