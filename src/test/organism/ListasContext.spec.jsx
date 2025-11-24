import { renderHook, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ListasProvider, useListas } from '../../context/ListasContext';
import { AuthProvider } from '../../context/AuthContext';

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <ListasProvider>
        {children}
      </ListasProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('ListasContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('debe proporcionar valores iniciales correctos', () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    expect(result.current.listas).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.createLista).toBe('function');
    expect(typeof result.current.deleteLista).toBe('function');
  });

  it('debe crear una nueva lista', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    await act(async () => {
      const response = await result.current.createLista('Mi Lista', 'Descripción de prueba');
      expect(response.success).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.listas.length).toBeGreaterThan(0);
    });
  });

  it('debe actualizar una lista existente', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    // Crear una lista primero
    let listaId;
    await act(async () => {
      const response = await result.current.createLista('Lista Original', 'Descripción');
      listaId = response.lista.id;
    });

    // Actualizar la lista
    await act(async () => {
      const response = await result.current.updateLista(
        listaId,
        'Lista Actualizada',
        'Nueva descripción'
      );
      expect(response.success).toBe(true);
    });

    await waitFor(() => {
      const lista = result.current.listas.find(l => l.id === listaId);
      expect(lista.nombre).toBe('Lista Actualizada');
    });
  });

  it('debe eliminar una lista', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    // Crear una lista primero
    let listaId;
    await act(async () => {
      const response = await result.current.createLista('Lista a Eliminar', '');
      listaId = response.lista.id;
    });

    const initialLength = result.current.listas.length;

    // Eliminar la lista
    await act(async () => {
      await result.current.deleteLista(listaId);
    });

    await waitFor(() => {
      expect(result.current.listas.length).toBe(initialLength - 1);
    });
  });

  it('debe agregar producto a lista', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    const mockProducto = {
      id: 1,
      nombre: 'Producto Test',
      precio: 100
    };

    // Crear una lista primero
    let listaId;
    await act(async () => {
      const response = await result.current.createLista('Mi Lista', '');
      listaId = response.lista.id;
    });

    // Agregar producto
    await act(async () => {
      const response = await result.current.addProductoToLista(listaId, mockProducto);
      expect(response.success).toBe(true);
    });

    await waitFor(() => {
      const lista = result.current.listas.find(l => l.id === listaId);
      expect(lista.productos).toBeDefined();
      expect(lista.productos.length).toBeGreaterThan(0);
    });
  });

  it('debe remover producto de lista', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    const mockProducto = {
      id: 1,
      nombre: 'Producto Test',
      precio: 100
    };

    // Crear lista y agregar producto
    let listaId;
    await act(async () => {
      const response = await result.current.createLista('Mi Lista', '');
      listaId = response.lista.id;
      await result.current.addProductoToLista(listaId, mockProducto);
    });

    // Remover producto
    await act(async () => {
      const response = await result.current.removeProductoFromLista(listaId, mockProducto.id);
      expect(response.success).toBe(true);
    });

    await waitFor(() => {
      const lista = result.current.listas.find(l => l.id === listaId);
      const hasProduct = lista.productos?.some(p => p.id === mockProducto.id);
      expect(hasProduct).toBe(false);
    });
  });

  it('debe verificar si un producto está en una lista', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    const mockProducto = {
      id: 1,
      nombre: 'Producto Test',
      precio: 100
    };

    // Crear lista y agregar producto
    let listaId;
    await act(async () => {
      const response = await result.current.createLista('Mi Lista', '');
      listaId = response.lista.id;
      await result.current.addProductoToLista(listaId, mockProducto);
    });

    await waitFor(() => {
      const isInLista = result.current.isProductoInLista(mockProducto.id, listaId);
      expect(isInLista).toBe(true);
    });
  });

  it('debe obtener listas que contienen un producto', async () => {
    const { result } = renderHook(() => useListas(), {
      wrapper: Wrapper
    });

    const mockProducto = {
      id: 1,
      nombre: 'Producto Test',
      precio: 100
    };

    // Crear dos listas y agregar el producto a una
    await act(async () => {
      const lista1 = await result.current.createLista('Lista 1', '');
      await result.current.createLista('Lista 2', '');
      await result.current.addProductoToLista(lista1.lista.id, mockProducto);
    });

    await waitFor(() => {
      const listasConProducto = result.current.getListasWithProducto(mockProducto.id);
      expect(listasConProducto.length).toBe(1);
      expect(listasConProducto[0].nombre).toBe('Lista 1');
    });
  });

  it('debe lanzar error si se usa fuera del provider', () => {
    expect(() => {
      renderHook(() => useListas());
    }).toThrow('useListas debe usarse dentro de ListasProvider');
  });
});