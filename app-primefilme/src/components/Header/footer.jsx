import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="logo" to="/">
            Prime Filme <span className="dot" />
          </Link>
          {/* <p className="footer-tagline">Os melhores filmes, em um só lugar.</p> */}
        </div>

        <nav className="footer-nav">
          <Link to="/">Início</Link>
          <Link to="/favoritos">Meus Filmes</Link>
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} <a href="https://portfolio-oficial-seven.vercel.app/">José Silva</a>. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;