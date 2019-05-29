import axios from 'axios';
import { DEV_API_URL, PROD_API_URL } from '../config/config';
import { getItem } from '../utils/helpers';

let baseURL;

process.env.NODE_ENV === 'development'
  ? (baseURL = DEV_API_URL)
  : (baseURL = PROD_API_URL);
export const http = axios.create({
  baseURL,
  headers: {
    'x-access-token': getItem('token'),
  },
});
