import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import NavLinks from '../molecules/NavLinks';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ajusta si tu hook tiene otro path

function NavigationBar(/* props */) {
  const { user } = useAuth() || {}; // puede ser undefined si no hay hook

  console.log('Navbar user:', user);

  return (
    <BootstrapNavbar className="navbar-custom" expand="lg">
      <Container>
        <Logo />
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <NavLinks />
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default NavigationBar;