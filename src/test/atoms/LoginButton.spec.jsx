import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginButton from '../../components/atoms/LoginButton';

describe('LoginButton Component', () => {
  beforeEach(() => {
    render(<LoginButton />);
  });

  it('should render the login button', () => {
    const button = screen.getByText('Iniciar Sesión');
    expect(button).toBeTruthy();
  });

  it('should be a submit button', () => {
    const button = screen.getByText('Iniciar Sesión');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should have correct styling classes', () => {
    const button = screen.getByText('Iniciar Sesión');
    expect(button.classList.contains('w-100')).toBe(true);
    expect(button.classList.contains('mb-3')).toBe(true);
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
  });
});