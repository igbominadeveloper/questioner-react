import jwt from 'jsonwebtoken';

export const decodeToken = token => {
  return jwt.decode(token);
};

export const setItem = (name, value) => {
  localStorage.setItem(name, value);
};

export const getItem = name => {
  const item = localStorage.getItem(name);
  return item;
};

export const destroyItem = item => {
  return localStorage.removeItem(item);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
