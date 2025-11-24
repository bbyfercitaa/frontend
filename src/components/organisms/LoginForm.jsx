import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import LoginButton from '../atoms/LoginButton';
import AlertMessage from '../atoms/AlertMessage';
import LoginFooter from '../molecules/LoginFooter';

function LoginForm() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    try {
      const result = await login({
        correo: formData.email,
        contrasena: formData.password
      });

      if (result.success) {
        setShowAlert(true);
        setError('');
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error('Error en login:', err);
    }
  };

  return (
    <div className="login-form-container">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>
      
      {error && <AlertMessage variant="danger" message={error} />}
      
      {showAlert && (
        <AlertMessage 
          variant="success" 
          message="¡Inicio de sesión exitoso! Redirigiendo..." 
        />
      )}
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fieldType="email"
        />
        <PasswordField
          value={formData.password}
          onChange={handleChange}
        />
        <LoginButton disabled={loading} />
        <LoginFooter />
      </Form>
      {loading && (
        <div className="text-center mt-3">
          <small className="text-muted">Verificando credenciales...</small>
        </div>
      )}
    </div>
  );
}

export default LoginForm;