import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vogelcodes.com',
});

export default api;
