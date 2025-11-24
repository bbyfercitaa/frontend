import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormGroup from './FormGroup';

const FormField = ({ label, name, value, onChange, fieldType = 'text' }) => {
  const isTextarea = fieldType === 'textarea';
  const isEmail = fieldType === 'email';

  return (
    <FormGroup>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={isEmail ? 'email' : 'text'}
        as={isTextarea ? 'textarea' : undefined}
        rows={isTextarea ? 4 : undefined}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </FormGroup>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldType: PropTypes.oneOf(['text', 'email', 'textarea'])
};

export default FormField;