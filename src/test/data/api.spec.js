import { productosAPI, usuariosAPI, listasAPI } from '../../data/api';

describe('ProductosAPI', () => {
  beforeEach(() => {
    // Mock de fetch
    global.fetch = jasmine.createSpy('fetch');
  });

  afterEach(() => {
    delete global.fetch;
  });

  describe('getAll', () => {
    it('debe obtener todos los productos', async () => {
      const mockProductos = [
        { id: 1, nombre: 'Producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', precio: 200 }
      ];

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProductos)
      }));

      const productos = await productosAPI.getAll();

      expect(global.fetch).toHaveBeenCalled();
      expect(productos).toEqual(mockProductos);
      expect(productos.length).toBe(2);
    });

    it('debe lanzar error cuando falla la petición', async () => {
      global.fetch.and.returnValue(Promise.resolve({
        ok: false,
        status: 500
      }));

      try {
        await productosAPI.getAll();
        fail('Debería haber lanzado un error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getById', () => {
    it('debe obtener un producto por ID', async () => {
      const mockProducto = { id: 1, nombre: 'Producto 1', precio: 100 };

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducto)
      }));

      const producto = await productosAPI.getById(1);

      expect(producto).toEqual(mockProducto);
      expect(producto.id).toBe(1);
    });
  });

  describe('create', () => {
    it('debe crear un nuevo producto', async () => {
      const nuevoProducto = {
        nombre: 'Producto Nuevo',
        precio: 150,
        descripcion: 'Descripción'
      };

      const mockRespuesta = { id: 3, ...nuevoProducto };

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRespuesta)
      }));

      const resultado = await productosAPI.create(nuevoProducto);

      expect(resultado).toEqual(mockRespuesta);
      expect(resultado.id).toBe(3);
    });
  });

  describe('update', () => {
    it('debe actualizar un producto existente', async () => {
      const productoActualizado = {
        nombre: 'Producto Actualizado',
        precio: 200
      };

      const mockRespuesta = { id: 1, ...productoActualizado };

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRespuesta)
      }));

      const resultado = await productosAPI.update(1, productoActualizado);

      expect(resultado).toEqual(mockRespuesta);
      expect(resultado.nombre).toBe('Producto Actualizado');
    });
  });

  describe('delete', () => {
    it('debe eliminar un producto', async () => {
      global.fetch.and.returnValue(Promise.resolve({
        ok: true
      }));

      const resultado = await productosAPI.delete(1);

      expect(resultado).toBe(true);
    });

    it('debe lanzar error cuando falla la eliminación', async () => {
      global.fetch.and.returnValue(Promise.resolve({
        ok: false,
        status: 404
      }));

      try {
        await productosAPI.delete(999);
        fail('Debería haber lanzado un error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe('UsuariosAPI', () => {
  beforeEach(() => {
    global.fetch = jasmine.createSpy('fetch');
  });

  afterEach(() => {
    delete global.fetch;
  });

  describe('login', () => {
    it('debe realizar login correctamente', async () => {
      const credenciales = {
        correo: 'test@test.com',
        contrasena: 'password123'
      };

      const resultado = await usuariosAPI.login(credenciales);

      expect(resultado).toBeDefined();
      expect(resultado.correo).toBe(credenciales.correo);
      expect(resultado.token).toBeDefined();
    });
  });

  describe('register', () => {
    it('debe registrar un nuevo usuario', async () => {
      const nuevoUsuario = {
        nombre: 'Test User',
        correo: 'test@test.com',
        contrasena: 'password123'
      };

      const mockRespuesta = { id: 1, ...nuevoUsuario };

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRespuesta)
      }));

      const resultado = await usuariosAPI.register(nuevoUsuario);

      expect(resultado).toBeDefined();
      expect(resultado.token).toBeDefined();
    });
  });
});

describe('ListasAPI', () => {
  beforeEach(() => {
    global.fetch = jasmine.createSpy('fetch');
  });

  afterEach(() => {
    delete global.fetch;
  });

  describe('getAll', () => {
    it('debe obtener todas las listas', async () => {
      const mockListas = [
        { id: 1, nombre: 'Lista 1' },
        { id: 2, nombre: 'Lista 2' }
      ];

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockListas)
      }));

      const listas = await listasAPI.getAll();

      expect(listas).toEqual(mockListas);
      expect(listas.length).toBe(2);
    });
  });

  describe('create', () => {
    it('debe crear una nueva lista', async () => {
      const nuevaLista = {
        nombre: 'Mi Lista',
        descripción: 'Lista de prueba'
      };

      const mockRespuesta = { id: 1, ...nuevaLista };

      global.fetch.and.returnValue(Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRespuesta)
      }));

      const resultado = await listasAPI.create(nuevaLista);

      expect(resultado).toEqual(mockRespuesta);
      expect(resultado.id).toBe(1);
    });
  });
});