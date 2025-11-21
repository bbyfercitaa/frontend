import { Container } from 'react-bootstrap';
import RegisterForm from '../components/organisms/RegisterForm';
import '../styles/pages/Registrarse.css';

function Registrarse() {
  return (
    <div className="register-page">
      <Container>
        <RegisterForm />
      </Container>
    </div>
  );
}

export default Registrarse;