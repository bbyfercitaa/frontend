import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertMessage = ({ variant, message }) => {
  return (
    <Alert variant={variant} className="mb-3">
      {message}
    </Alert>
  );
};

AlertMessage.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default AlertMessage;