import axios from 'axios';

const HOST = 'http://192.168.1.14:3000';
const apiUrl = `${HOST}/api`;
const headers = {
  'Content-Type': 'application/json',
};

const getPopularMovies = async () => {
  try {
    const res = await axios.get(`${apiUrl}/movies/popular`, {headers});
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getTrendingMovies = async () => {
  try {
    const res = await axios.get(`${apiUrl}/movies/trending`, {headers});
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const API = {
  getPopularMovies,
  getTrendingMovies,
};
