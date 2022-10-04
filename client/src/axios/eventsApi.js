import axios from 'axios';

const eventsApi = axios.create({
  baseURL: 'https://plataformaeventos-production-6111.up.railway.app',
});

// TODO: configurar interceptores

eventsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default eventsApi;
