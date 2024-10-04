import {createSlice} from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
    userInfo: {
      avatar: '',
    },
    token: null,
    movies: [],
  },
  reducers: {
    setUserInfo: (state, actions) => {
      state.userInfo = actions.payload;
    },
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    setMovies: () => {
      state.movies = actions.payload;
    },
  },
});

export default AppSlice.reducer;
export const AppActions = {
  ...AppSlice.actions,
};
