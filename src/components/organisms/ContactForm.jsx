import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import FormField from '../molecules/FormField';

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mostrar el mensaje de éxito
    setShowAlert(true);
    // Limpiar el formulario
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="contact-form">
      <h1>Envíanos un Mensaje</h1>
      {showAlert && (
        <Alert variant="success" className="mb-3">
          ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
        </Alert>
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
        <FormField
          label="Asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
        />
        <FormField
          label="Mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          fieldType="textarea"
        />
        <Button variant="primary" type="submit" className="w-100">
          Enviar Mensaje
        </Button>
      </Form>
    </div>
  );
}

export default ContactForm;