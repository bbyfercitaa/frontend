import { createContext, useContext, useState, useEffect } from 'react';
import { usuariosAPI } from '../../data/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error al cargar usuario:', err);
        sessionStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (credenciales) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await usuariosAPI.login(credenciales);
      
      const userData = {
        id: response.id,
        nombre: response.nombre_usuario,
        correo: response.correo_usuario,
        rol: response.codigo_rol
      };

      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', response.token || 'mock-token');
      
      setUser(userData);
      return { success: true };
      
    } catch (err) {
      const errorMsg = err.message || 'Error al iniciar sesión';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (datosUsuario) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Registrando usuario:', datosUsuario);
      const response = await usuariosAPI.register(datosUsuario);
      console.log('Respuesta del registro:', response);
      
      const userData = {
        id: response.id,
        nombre: response.nombre_usuario,
        correo: response.correo_usuario,
        rol: response.codigo_rol
      };

      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', response.token || 'usuario-' + response.id);
      
      setUser(userData);
      return { success: true };
      
    } catch (err) {
      const errorMsg = err.message || 'Error al registrarse';
      setError(errorMsg);
      console.error('Error en registro:', err);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setError(null);
  };
  const isAuthenticated = () => {
    return user !== null && sessionStorage.getItem('token') !== null;
  };
  const getToken = () => {
    return sessionStorage.getItem('token');
  };
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
    getToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;
