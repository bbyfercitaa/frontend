import React from 'react';
import logoImage from '../../assets/logo.webp';

const Logo = () => {
  return (
    <div className="logo-container" data-testid="logo-container">
      <img src={logoImage} alt="¿Qué le doy?" className="logo-img" />
    </div>
  );
};

export default Logo;