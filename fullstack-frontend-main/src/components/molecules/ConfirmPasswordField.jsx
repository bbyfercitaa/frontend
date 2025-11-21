import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmPasswordField = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Confirmar Contraseña</Form.Label>
      <Form.Control
        type="password"
        name="confirmPassword"
        value={value}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
};

ConfirmPasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ConfirmPasswordField;