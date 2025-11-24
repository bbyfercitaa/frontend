import { Container } from 'react-bootstrap';
import AboutContent from '../components/organisms/AboutContent';
import '../styles/pages/Nosotros.css';

function Nosotros() {
  return (
    <div className="nosotros-page">
      <Container>
        <AboutContent />
      </Container>
    </div>
  );
}

export default Nosotros;