import { Container, Row, Col } from 'react-bootstrap';
import '../styles/pages/Contactos.css';
import ContactForm from '../components/organisms/ContactForm';
import ContactInfo from '../components/organisms/ContactInfo';

function Contactos() {
  return (
    <div className="contactos-page">
      <Container>
        <h1 className="text-center mb-5">Contáctanos</h1>
        <Row>
          <Col md={6} className="mb-4">
            <ContactInfo />
          </Col>
          <Col md={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contactos;