import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PasswordField = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Contraseña</Form.Label>
      <InputGroup>
        <Form.Control
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={onChange}
          required
        />
        <InputGroup.Text 
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        >
          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PasswordField;