import { Container } from 'react-bootstrap';
import LoginForm from '../components/organisms/LoginForm';
import '../styles/pages/IniciarSesion.css';

function IniciarSesion() {
  return (
    <div className="login-page">
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
}

export default IniciarSesion;