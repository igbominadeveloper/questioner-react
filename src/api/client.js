import axios from 'axios';
import { DEV_API_URL, PROD_API_URL } from '../config/config';
import { getItem } from '../utils/helpers';

let baseURL;

process.env.NODE_ENV === 'development'
  ? (baseURL = DEV_API_URL)
  : (baseURL = PROD_API_URL);

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  function(config) {
    const token = getItem('token');
    if (token) config.headers['x-access-token'] = token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export { http };
