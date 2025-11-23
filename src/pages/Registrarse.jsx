import { Container } from 'react-bootstrap';
import RegisterForm from '../components/organisms/RegisterForm';
import '../styles/pages/Registrarse.css';

const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = { name, email, password };
  console.log('Register payload:', payload);
  try {
    const res = await authAPI.register(payload);
    console.log('Register response:', res);
  } catch (err) {
    console.error('Register error:', err.response?.status, err.response?.data || err.message);
  }
};

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