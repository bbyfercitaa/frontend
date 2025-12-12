import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

describe('AuthContext', () => {
  beforeEach(() => {
    // Limpiar sessionStorage antes de cada prueba
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('debe proporcionar valores iniciales correctos', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });

  it('debe cargar usuario desde sessionStorage', () => {
    const mockUser = {
      id: 1,
      nombre: 'Test User',
      correo: 'test@test.com',
      rol: { nombre: 'USER' }
    };

    sessionStorage.setItem('user', JSON.stringify(mockUser));
    sessionStorage.setItem('token', 'mock-token');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it('debe realizar login correctamente', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const credenciales = {
      correo: 'test@test.com',
      contrasena: 'password123'
    };

    await act(async () => {
      const response = await result.current.login(credenciales);
      expect(response.success).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
      expect(result.current.user.correo).toBe(credenciales.correo);
    });
  });

  it('debe realizar logout correctamente', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    // Simular usuario logueado
    const mockUser = {
      id: 1,
      nombre: 'Test User',
      correo: 'test@test.com'
    };
    sessionStorage.setItem('user', JSON.stringify(mockUser));
    sessionStorage.setItem('token', 'mock-token');

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(sessionStorage.getItem('user')).toBeNull();
    expect(sessionStorage.getItem('token')).toBeNull();
  });

  it('debe verificar autenticación correctamente', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    // Sin usuario
    expect(result.current.isAuthenticated()).toBe(false);

    // Con usuario
    sessionStorage.setItem('user', JSON.stringify({ id: 1 }));
    sessionStorage.setItem('token', 'mock-token');

    const { result: result2 } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result2.current.isAuthenticated()).toBe(true);
  });

  it('debe obtener token correctamente', () => {
    const mockToken = 'mock-token-123';
    sessionStorage.setItem('token', mockToken);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.getToken()).toBe(mockToken);
  });

  it('debe lanzar error si se usa fuera del provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth debe usarse dentro de AuthProvider');
  });
});