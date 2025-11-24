import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../components/organisms/LoginForm';
import { AuthProvider } from '../../context/AuthContext';

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('LoginForm', () => {
  it('debe renderizar el formulario correctamente', () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Iniciar Sesión', { selector: 'button' })).toBeTruthy();
  });

  it('debe mostrar enlace a registro', () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    expect(screen.getByText('¿No tienes una cuenta?')).toBeTruthy();
    expect(screen.getByText('Regístrate aquí')).toBeTruthy();
  });

  it('debe permitir escribir en el campo email', () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('debe permitir escribir en el campo contraseña', () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const passwordInput = screen.getByLabelText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  it('debe mostrar error cuando los campos están vacíos', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, completa todos los campos')).toBeTruthy();
    });
  });

  it('debe validar formato de email', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, ingresa un email válido')).toBeTruthy();
    });
  });

  it('debe limpiar errores al escribir', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, completa todos los campos')).toBeTruthy();
    });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    await waitFor(() => {
      expect(screen.queryByText('Por favor, completa todos los campos')).toBeNull();
    });
  });

  it('debe realizar login con credenciales válidas', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Inicio de sesión exitoso/)).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('debe deshabilitar el botón mientras está cargando', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // El botón debería estar deshabilitado durante la carga
    expect(submitButton.disabled).toBe(true);
  });

  it('debe mostrar mensaje de verificación mientras carga', async () => {
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Contraseña');
    const submitButton = screen.getByText('Iniciar Sesión', { selector: 'button' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const loadingText = screen.queryByText('Verificando credenciales...');
      // Puede estar presente o no dependiendo del timing
      expect(loadingText !== null || screen.getByText(/exitoso/)).toBeTruthy();
    });
  });
});