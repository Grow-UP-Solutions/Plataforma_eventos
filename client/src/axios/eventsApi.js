import axios from 'axios';

const eventsApi = axios.create({
  baseURL: 'plataformaeventos-production.up.railway.app',
});

/* http://localhost:3001 */
/* https://plataformaeventos-production-e0ed.up.railway.app */
// TODO: configurar interceptores

eventsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
    'x-token-password': localStorage.getItem('token-pass'),
    'x-token-organizer': localStorage.getItem('token-organizer'),
  };

  return config;
});

export default eventsApi;
