import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

export const setToken = (token: string) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const getUser = (): User | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<User>(token);
  } catch {
    return null;
  }
};

export const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === 'ADMIN';
};
