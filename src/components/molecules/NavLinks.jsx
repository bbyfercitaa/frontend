import { Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/molecules/NavLinks.css';

const NavLinks = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav className="ms-auto nav-links">
      <Nav.Link as={Link} to="/">Inicio</Nav.Link>
      <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
      <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
      <Nav.Link as={Link} to="/contactos">Contacto</Nav.Link>
      {isAuthenticated() ? (
        <>
          <Dropdown align="end">
            <Dropdown.Toggle variant="success" id="dropdown-user">
              {user?.nombre || 'Usuario'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item disabled>
                <small className="text-muted">{user?.correo}</small>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/perfil">
                Mi Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/mis-listas">
                Mis Listas
              </Dropdown.Item>
              {user?.rol?.nombre === 'ADMIN' && (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/admin">
                    Panel Admin
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/registrarse">Registrarse</Nav.Link>
          <Nav.Link as={Link} to="/inicio-sesion" className="login-button">
            Iniciar Sesión
          </Nav.Link>
        </>
      )}
    </Nav>
  );
};

export default NavLinks;