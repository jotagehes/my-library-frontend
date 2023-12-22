import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://books-coz7.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token && !config.url.includes('/api/seguranca/login') && !config.url.includes('/api/seguranca/register')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default instance;
