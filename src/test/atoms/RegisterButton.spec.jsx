import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterButton from '../../components/atoms/RegisterButton';

describe('RegisterButton Component', () => {
  beforeEach(() => {
    render(<RegisterButton />);
  });

  it('should render the register button', () => {
    const button = screen.getByText('Crear Cuenta');
    expect(button).toBeTruthy();
  });

  it('should be a submit button', () => {
    const button = screen.getByText('Crear Cuenta');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('should have correct styling classes', () => {
    const button = screen.getByText('Crear Cuenta');
    expect(button.classList.contains('w-100')).toBe(true);
    expect(button.classList.contains('mb-3')).toBe(true);
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
  });
});