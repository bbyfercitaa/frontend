import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Nosotros from '../../pages/Nosotros';
import Contactos from '../../pages/Contactos';
import Registrarse from '../../pages/Registrarse';
import IniciarSesion from '../../pages/IniciarSesion';
import Productos from '../../pages/Productos';

const RouterNavbar = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/contactos" element={<Contactos />} />
      <Route path="/registrarse" element={<Registrarse />} />
      <Route path="/inicio-sesion" element={<IniciarSesion />} />
    </Routes>
  );
};

export default RouterNavbar;