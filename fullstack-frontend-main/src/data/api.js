// Configuración de la API - Conectado con backend Java Spring Boot en Render
const API_BASE_URL = 'https://queledoy-backend-7ejz.onrender.com/api/v1';

console.log('🔗 API Base URL conectada con Render:', API_BASE_URL);

// Clase para manejar las peticiones a la API de productos
class ProductosAPI {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async getAll() {
    try {
      const response = await fetch(`${this.baseURL}/productos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Productos cargados desde backend:', data);
      return data;
    } catch (error) {
      console.error('❌ Error en ProductosAPI.getAll():', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await fetch(`${this.baseURL}/productos/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en ProductosAPI.getById():', error);
      throw error;
    }
  }

  async create(producto) {
    try {
      const response = await fetch(`${this.baseURL}/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en ProductosAPI.create():', error);
      throw error;
    }
  }

  async update(id, producto) {
    try {
      const response = await fetch(`${this.baseURL}/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en ProductosAPI.update():', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetch(`${this.baseURL}/productos/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error en ProductosAPI.delete():', error);
      throw error;
    }
  }
}

// Instancia del servicio de productos
export const productosAPI = new ProductosAPI();

// Servicio para otras APIs (usuarios, pedidos, etc.)
class UsuariosAPI {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async login(credenciales) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciales)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en UsuariosAPI.login():', error);
      throw error;
    }
  }

  async register(datosUsuario) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosUsuario)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en UsuariosAPI.register():', error);
      throw error;
    }
  }
}

// Instancia del servicio de usuarios
export const usuariosAPI = new UsuariosAPI();

// Exportar configuración por defecto
export default {
  productos: productosAPI,
  usuarios: usuariosAPI,
  baseURL: API_BASE_URL
};