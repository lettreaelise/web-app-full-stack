
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptador para adicionar o token JWT no cabeçalho (header) de cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
