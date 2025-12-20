import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Логирование запросов
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);

// Логирование ответов
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status}`);
    return response;
  },
  (error) => {
    console.error('[API Error]', error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;