import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../../components/atoms/Logo';

describe('Logo Component', () => {
  beforeEach(() => {
    render(<Logo />);
  });

  it('should render logo container', () => {
    const logoContainer = screen.getByTestId('logo-container');
    expect(logoContainer).toBeTruthy();
    expect(logoContainer.classList.contains('logo-container')).toBe(true);
  });

  it('should render logo image with correct attributes', () => {
    const logoImage = screen.getByAltText('¿Qué le doy?');
    expect(logoImage).toBeTruthy();
    expect(logoImage.classList.contains('logo-img')).toBe(true);
    expect(logoImage.hasAttribute('src')).toBe(true);
    expect(logoImage.getAttribute('alt')).toBe('¿Qué le doy?');
  });
});