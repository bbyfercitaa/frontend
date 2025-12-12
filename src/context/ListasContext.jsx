import { createContext, useContext, useState, useEffect } from 'react';
import { listasAPI } from '../data/api';
import { useAuth } from './AuthContext';

const ListasContext = createContext(null);

export const ListasProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar listas del usuario al iniciar
  useEffect(() => {
    if (isAuthenticated()) {
      loadListas();
    } else {
      setListas([]);
    }
  }, [user]);

  const loadListas = async () => {
    try {
      setLoading(true);
      const data = await listasAPI.getAll();
      setListas(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar listas:', err);
      setError('Error al cargar las listas');
      setListas([]);
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva lista
  const createLista = async (nombre, descripcion = '') => {
    try {
      setLoading(true);
      const nuevaLista = await listasAPI.create({
        nombre,
        descripción: descripcion
      });
      
      setListas(prev => [...prev, nuevaLista]);
      setError(null);
      return { success: true, lista: nuevaLista };
    } catch (err) {
      const errorMsg = 'Error al crear la lista';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar lista
  const updateLista = async (id, nombre, descripcion) => {
    try {
      setLoading(true);
      const listaActualizada = await listasAPI.update(id, {
        nombre,
        descripción: descripcion
      });
      
      setListas(prev => prev.map(l => l.id === id ? listaActualizada : l));
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al actualizar la lista';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar lista
  const deleteLista = async (id) => {
    try {
      setLoading(true);
      await listasAPI.delete(id);
      setListas(prev => prev.filter(l => l.id !== id));
      setError(null);
      return { success: true };
    } catch (err) {
      const errorMsg = 'Error al eliminar la lista';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto a lista
  const addProductoToLista = async (listaId, producto) => {
    try {
      await listasAPI.addProducto(listaId, producto.id);
      
      // Actualizar estado local
      setListas(prev => prev.map(lista => {
        if (lista.id === listaId) {
          const productos = lista.productos || [];
          if (!productos.find(p => p.id === producto.id)) {
            return { ...lista, productos: [...productos, producto] };
          }
        }
        return lista;
      }));
      
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al agregar producto a la lista' };
    }
  };

  // Remover producto de lista
  const removeProductoFromLista = async (listaId, productoId) => {
    try {
      await listasAPI.removeProducto(listaId, productoId);
      
      // Actualizar estado local
      setListas(prev => prev.map(lista => {
        if (lista.id === listaId) {
          const productos = (lista.productos || []).filter(p => p.id !== productoId);
          return { ...lista, productos };
        }
        return lista;
      }));
      
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al remover producto de la lista' };
    }
  };

  // Verificar si un producto está en alguna lista
  const isProductoInLista = (productoId, listaId = null) => {
    if (listaId) {
      const lista = listas.find(l => l.id === listaId);
      return lista?.productos?.some(p => p.id === productoId) || false;
    }
    
    return listas.some(lista => 
      lista.productos?.some(p => p.id === productoId)
    );
  };

  // Obtener listas que contienen un producto
  const getListasWithProducto = (productoId) => {
    return listas.filter(lista => 
      lista.productos?.some(p => p.id === productoId)
    );
  };

  const value = {
    listas,
    loading,
    error,
    loadListas,
    createLista,
    updateLista,
    deleteLista,
    addProductoToLista,
    removeProductoFromLista,
    isProductoInLista,
    getListasWithProducto
  };

  return (
    <ListasContext.Provider value={value}>
      {children}
    </ListasContext.Provider>
  );
};

// Hook personalizado
export const useListas = () => {
  const context = useContext(ListasContext);
  if (!context) {
    throw new Error('useListas debe usarse dentro de ListasProvider');
  }
  return context;
};

export default ListasContext;