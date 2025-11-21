import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import Logo from '../atoms/Logo';
import NavLinks from '../molecules/NavLinks';
import '../../styles/organisms/Navbar.css';

function NavigationBar() {
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