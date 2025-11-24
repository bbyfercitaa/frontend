import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="text-center mt-3">
      <p className="mb-0">¿No tienes una cuenta?</p>
      <Link to="/registrarse" className="btn btn-link">
        Regístrate aquí
      </Link>
    </div>
  );
};

export default LoginFooter;