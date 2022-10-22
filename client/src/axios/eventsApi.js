import axios from 'axios';

const eventsApi = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:3001',
});

// TODO: configurar interceptores

eventsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
    'x-token-password': localStorage.getItem('token-pass'),
  };

  return config;
});

export default eventsApi;
