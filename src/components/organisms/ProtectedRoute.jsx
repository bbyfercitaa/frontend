import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si requireAuth es true, necesita estar autenticado
  if (requireAuth) {
    return isAuthenticated() ? children : <Navigate to="/inicio-sesion" replace />;
  }

  // Si requireAuth es false, NO debe estar autenticado (para login/registro)
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

export default ProtectedRoute;