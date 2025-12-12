import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormGroup = ({ children, className = 'mb-3' }) => {
  return (
    <Form.Group className={className}>
      {children}
    </Form.Group>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default FormGroup;