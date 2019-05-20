import axios from 'axios';
import { getToken } from '../utils/helpers';
import { DEV_API_URL, PROD_API_URL } from '../config/config';

let baseURL;

process.env.NODE_ENV === 'development'
  ? (baseURL = DEV_API_URL)
  : (baseURL = PROD_API_URL);

let Authorization;
if (getToken()) {
  Authorization = { Authorization: getToken() };
}

export const http = axios.create({
  baseURL,
  headers: {
    ...Authorization,
  },
});
