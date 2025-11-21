import React from 'react';
import { Link } from 'react-router-dom';

const RegisterFooter = () => {
  return (
    <div className="text-center mt-3">
      <p className="mb-0">¿Ya tienes una cuenta?</p>
      <Link to="/inicio-sesion" className="btn btn-link">
        Inicia sesión aquí
      </Link>
    </div>
  );
};

export default RegisterFooter;