import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const api = axios.create({ baseURL: API_BASE, timeout: 10000 });

export const authAPI = {
  register: (payload) => api.post('/auth/register', payload).then(r => r.data),
  login: (payload) => api.post('/auth/login', payload).then(r => r.data),
};

export const listasAPI = {
  getAll: () => api.get('/listas').then(r => r.data),
  getById: (id) => api.get(`/listas/${id}`).then(r => r.data),
  create: (payload) => api.post('/listas', payload).then(r => r.data),
  update: (id, payload) => api.put(`/listas/${id}`, payload).then(r => r.data),
  delete: (id) => api.delete(`/listas/${id}`).then(r => r.data),
  addProducto: (listaId, productoId) => api.post(`/listas/${listaId}/productos`, { productoId }).then(r => r.data),
  removeProducto: (listaId, productoId) => api.delete(`/listas/${listaId}/productos/${productoId}`).then(r => r.data),
};

export default api;