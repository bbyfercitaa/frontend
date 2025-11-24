import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import ConfirmPasswordField from '../molecules/ConfirmPasswordField';
import RegisterButton from '../atoms/RegisterButton';
import AlertMessage from '../atoms/AlertMessage';
import RegisterFooter from '../molecules/RegisterFooter';

function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const validateForm = () => {
        if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const result = await register({
        nombre: formData.nombre,
        correo: formData.email,
        contrasena: formData.password,
        activo: true,
        fechaRegistro: new Date().toISOString().split('T')[0]
      });

      if (result.success) {
        setShowAlert(true);
        setError('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(result.error || 'Error al crear la cuenta');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error('Error en registro:', err);
    }
  };

  return (
    <div className="register-form-container">
      <h1 className="text-center mb-4">Crear Cuenta</h1>
      {error && <AlertMessage variant="danger" message={error} />}
      {showAlert && (
        <AlertMessage 
          variant="success" 
          message="¡Registro exitoso! Redirigiendo..." 
        />
      )}
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
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
        <ConfirmPasswordField
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <RegisterButton disabled={loading} />
        <RegisterFooter />
      </Form>
      {loading && (
        <div className="text-center mt-3">
          <small className="text-muted">Creando tu cuenta...</small>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;