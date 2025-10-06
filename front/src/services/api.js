import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-tcc-senai2025.vercel.app',
});

export default api;
