import axios from 'axios';

const HOST = 'http://192.168.1.4:8000';
const apiUrl = `${HOST}/api`;

const getPopularMovies = async (token: string) => {
  try {
    const res = await axios.get(`${apiUrl}/movies/popular`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTrendingMovies = async (token: string) => {
  try {
    const res = await axios.get(`${apiUrl}/movies/trending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const login = async (data: any) => {
  try {
    const res = await axios.post(`${apiUrl}/users/login`, data);
    return res;
  } catch (error: any) {
    return error?.response;
  }
};

const getUserById = async (id: number) => {
  try {
    const res = await axios.get(`${apiUrl}/users?id=${id}`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

const register = async (data: any) => {
  try {
    const res = await axios.post(`${apiUrl}/users/register`, data);
    return res;
  } catch (error: any) {
    return error.response;
  }
};

export const API = {
  getPopularMovies,
  getTrendingMovies,
  login,
  getUserById,
  register,
};
