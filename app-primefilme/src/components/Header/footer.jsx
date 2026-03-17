import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="logo" to="/">
            Catálogo Prime <span className="dot" />
          </Link>
          <nav className="footer-nav">
            <Link to="/">Início</Link>
            <Link to="/favoritos">Meus Filmes</Link>
            <p className="footer-copy">
              © {new Date().getFullYear()} <a target='_blank' rel='external' href="https://portfolio-oficial-seven.vercel.app/">José Silva</a>. Todos os direitos reservados.
            </p>
          </nav>
        </div>


      </div>
    </footer>
  );
}

export default Footer;