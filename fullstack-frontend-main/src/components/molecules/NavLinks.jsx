import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/molecules/NavLinks.css';

const NavLinks = () => {
  const userName = localStorage.getItem('userName');

  return (
    <Nav className="ms-auto nav-links">
      <Nav.Link as={Link} to="/">Inicio</Nav.Link>
      <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
      <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
      <Nav.Link as={Link} to="/contactos">Contacto</Nav.Link>
      <Nav.Link as={Link} to="/registrarse">Registrarse</Nav.Link>
      <Nav.Link as={Link} to="/inicio-sesion" className="login-button">
        Iniciar Sesión
      </Nav.Link>

    </Nav>
  );
};

export default NavLinks;