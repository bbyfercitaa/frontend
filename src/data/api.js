import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://queledoy-backend-7ejz.onrender.com/api/v1';

const api = axios.create({ 
  baseURL: API_BASE, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token si existe
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// AUTH API - Endpoints de autenticación
export const authAPI = {
  register: async (payload) => {
    try {
      console.log('Enviando registro a:', `${API_BASE}/usuarios`);
      const response = await api.post('/usuarios', {
        nombre_usuario: payload.nombre,
        correo_usuario: payload.correo,
        contrasena_usuario: payload.contrasena,
        usuario_activo: true,
        fecha_registro: new Date().toISOString().split('T')[0]
      });
      console.log('Usuario registrado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message || 'Error al registrar usuario');
    }
  },
  
  login: async (payload) => {
    try {
      const response = await api.post('/usuarios/login', {
        correo: payload.correo,
        contrasena: payload.contrasena
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
};

// PRODUCTOS API
export const productosAPI = {
  getAll: () => api.get('/productos').then(r => r.data),
  getById: (id) => api.get(`/productos/${id}`).then(r => r.data),
  create: (payload) => api.post('/productos', payload).then(r => r.data),
  update: (id, payload) => api.put(`/productos/${id}`, payload).then(r => r.data),
  delete: (id) => api.delete(`/productos/${id}`).then(r => r.data),
};

// USUARIOS API
export const usuariosAPI = {
  getAll: () => api.get('/usuarios').then(r => r.data),
  getById: (id) => api.get(`/usuarios/${id}`).then(r => r.data),
  register: (payload) => authAPI.register(payload),
  update: (id, payload) => api.put(`/usuarios/${id}`, payload).then(r => r.data),
  delete: (id) => api.delete(`/usuarios/${id}`).then(r => r.data),
  login: (payload) => authAPI.login(payload),
};

// LISTAS API
export const listasAPI = {
  getAll: () => api.get('/listas').then(r => r.data),
  getById: (id) => api.get(`/listas/${id}`).then(r => r.data),
  create: (payload) => api.post('/listas', payload).then(r => r.data),
  update: (id, payload) => api.put(`/listas/${id}`, payload).then(r => r.data),
  delete: (id) => api.delete(`/listas/${id}`).then(r => r.data),
  addProducto: (listaId, productoId) => 
    api.post(`/listas/${listaId}/productos`, { productoId }).then(r => r.data),
  removeProducto: (listaId, productoId) => 
    api.delete(`/listas/${listaId}/productos/${productoId}`).then(r => r.data),
};

// CATEGORIAS API
export const categoriasAPI = {
  getAll: () => api.get('/categorias').then(r => r.data),
  getById: (id) => api.get(`/categorias/${id}`).then(r => r.data),
  create: (payload) => api.post('/categorias', payload).then(r => r.data),
  update: (id, payload) => api.put(`/categorias/${id}`, payload).then(r => r.data),
  delete: (id) => api.delete(`/categorias/${id}`).then(r => r.data),
};

export default api;
