import { render, screen } from '@testing-library/react';
import Logo from '../../components/atoms/Logo';
import LoginButton from '../../components/atoms/LoginButton';
import RegisterButton from '../../components/atoms/RegisterButton';
import ViewMoreButton from '../../components/atoms/ViewMoreButton';
import AlertMessage from '../../components/atoms/AlertMessage';

describe('Logo', () => {
  it('debe renderizar el logo correctamente', () => {
    render(<Logo />);
    
    const logoImg = screen.getByAltText('¿Qué le doy?');
    expect(logoImg).toBeTruthy();
    expect(logoImg.classList.contains('logo-img')).toBe(true);
  });

  it('debe tener el contenedor con la clase correcta', () => {
    const { container } = render(<Logo />);
    
    const logoContainer = container.querySelector('.logo-container');
    expect(logoContainer).toBeTruthy();
  });
});

describe('LoginButton', () => {
  it('debe renderizar el botón de login', () => {
    render(<LoginButton />);
    
    const button = screen.getByText('Iniciar Sesión');
    expect(button).toBeTruthy();
  });

  it('debe ser un botón de tipo submit', () => {
    render(<LoginButton />);
    
    const button = screen.getByText('Iniciar Sesión');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('debe tener las clases de estilo correctas', () => {
    render(<LoginButton />);
    
    const button = screen.getByText('Iniciar Sesión');
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
    expect(button.classList.contains('w-100')).toBe(true);
  });
});

describe('RegisterButton', () => {
  it('debe renderizar el botón de registro', () => {
    render(<RegisterButton />);
    
    const button = screen.getByText('Crear Cuenta');
    expect(button).toBeTruthy();
  });

  it('debe ser un botón de tipo submit', () => {
    render(<RegisterButton />);
    
    const button = screen.getByText('Crear Cuenta');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('debe tener las clases de estilo correctas', () => {
    render(<RegisterButton />);
    
    const button = screen.getByText('Crear Cuenta');
    expect(button.classList.contains('btn')).toBe(true);
    expect(button.classList.contains('btn-primary')).toBe(true);
  });
});

describe('ViewMoreButton', () => {
  const mockLink = 'https://www.example.com';

  it('debe renderizar el enlace correctamente', () => {
    render(<ViewMoreButton link={mockLink} />);
    
    const link = screen.getByText('Ver donde comprar');
    expect(link).toBeTruthy();
  });

  it('debe tener el href correcto', () => {
    render(<ViewMoreButton link={mockLink} />);
    
    const link = screen.getByText('Ver donde comprar');
    expect(link.getAttribute('href')).toBe(mockLink);
  });

  it('debe abrir en nueva pestaña', () => {
    render(<ViewMoreButton link={mockLink} />);
    
    const link = screen.getByText('Ver donde comprar');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('debe tener la clase correcta', () => {
    render(<ViewMoreButton link={mockLink} />);
    
    const link = screen.getByText('Ver donde comprar');
    expect(link.classList.contains('view-more')).toBe(true);
  });
});

describe('AlertMessage', () => {
  it('debe renderizar un mensaje de éxito', () => {
    render(<AlertMessage variant="success" message="Operación exitosa" />);
    
    expect(screen.getByText('Operación exitosa')).toBeTruthy();
  });

  it('debe renderizar un mensaje de error', () => {
    render(<AlertMessage variant="danger" message="Error en la operación" />);
    
    expect(screen.getByText('Error en la operación')).toBeTruthy();
  });

  it('debe aplicar la variante correcta', () => {
    const { container } = render(
      <AlertMessage variant="warning" message="Advertencia" />
    );
    
    const alert = container.querySelector('.alert');
    expect(alert.classList.contains('alert-warning')).toBe(true);
  });

  it('debe renderizar mensajes informativos', () => {
    render(<AlertMessage variant="info" message="Información importante" />);
    
    expect(screen.getByText('Información importante')).toBeTruthy();
  });

  it('debe tener la estructura correcta', () => {
    const { container } = render(
      <AlertMessage variant="success" message="Test" />
    );
    
    const alert = container.querySelector('.alert');
    expect(alert).toBeTruthy();
    expect(alert.classList.contains('alert')).toBe(true);
    expect(alert.classList.contains('mb-3')).toBe(true);
  });
});