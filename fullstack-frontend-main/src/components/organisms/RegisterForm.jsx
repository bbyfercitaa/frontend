import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import ConfirmPasswordField from '../molecules/ConfirmPasswordField';
import RegisterButton from '../atoms/RegisterButton';
import AlertMessage from '../atoms/AlertMessage';
import RegisterFooter from '../molecules/RegisterFooter';

function RegisterForm() {
  const navigate = useNavigate();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // Si todo está bien, procedemos con el registro
    setShowAlert(true);
    setError('');
    // Guardamos el nombre para mostrar el mensaje de bienvenida
    localStorage.setItem('userName', formData.nombre);
    // Redirigimos después de 2 segundos
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
          label="Nombre"
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
        <RegisterButton />
        <RegisterFooter />
      </Form>
    </div>
  );
}

export default RegisterForm;