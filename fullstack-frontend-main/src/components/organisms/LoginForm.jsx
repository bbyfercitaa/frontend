import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import LoginButton from '../atoms/LoginButton';
import AlertMessage from '../atoms/AlertMessage';
import LoginFooter from '../molecules/LoginFooter';

function LoginForm() {
  const navigate = useNavigate();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email && formData.password) {
      // Simulamos obtener el nombre del usuario (esto vendría de tu backend)
      const nombreUsuario = formData.email.split('@')[0];
      // Guardamos el nombre en localStorage para usarlo en toda la app
      localStorage.setItem('userName', nombreUsuario);
      setShowAlert(true);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setError('Por favor, completa todos los campos');
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
        <LoginButton />
        <LoginFooter />
      </Form>
    </div>
  );
}

export default LoginForm;