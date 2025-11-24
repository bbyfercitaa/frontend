import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../organisms/ProtectedRoute';
import Home from '../../pages/Home';
import Nosotros from '../../pages/Nosotros';
import Contactos from '../../pages/Contactos';
import Registrarse from '../../pages/Registrarse';
import IniciarSesion from '../../pages/IniciarSesion';
import Productos from '../../pages/Productos';
import AdminDashboard from '../../pages/AdminDashboard';
import MisListas from '../../pages/MisListas';
import ListaDetalle from '../../pages/ListaDetalle';

const RouterNavbar = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contactos" element={<Contactos />} />
      
      {/* Rutas de autenticación (solo para no autenticados) */}
      <Route 
        path="/registrarse" 
        element={
          <ProtectedRoute requireAuth={false}>
            <Registrarse />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/inicio-sesion" 
        element={
          <ProtectedRoute requireAuth={false}>
            <IniciarSesion />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas protegidas (requieren autenticación) */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requireAuth={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mis-listas" 
        element={
          <ProtectedRoute requireAuth={true}>
            <MisListas />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/listas/:id" 
        element={
          <ProtectedRoute requireAuth={true}>
            <ListaDetalle />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default RouterNavbar;