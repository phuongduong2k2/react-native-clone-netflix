import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from '../../api/api';
import {LoadingState} from '../../constants/constants';

const init = {
  status: 'idle',
  movies: [],
};

const MovieSlice = createSlice({
  name: 'movie',
  initialState: init,
  reducers: actions,
  extraReducers: builder =>
    builder
      .addCase(getAllMovies.pending, (state, action) => {
        state.status = LoadingState.loading;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.status = LoadingState.success;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.status = LoadingState.failed;
      }),
});

const actions = {};

const getAllMovies = createAsyncThunk('movie/getAllMovies', async () => {
  const res = await API.getAllMovies();
  return res.Movies;
});

// const getAllMoviesProgress = {
//     [getAllMovies.pending]:(state, action) => {
//         state.status = 'pending';
//     },[getAllMovies.fulfilled]:(state, action) => {
//         state.status = 'success';
//         state.movies = action.payload;
//     },[getAllMovies.rejected]:(state, action) => {
//         state.status = 'pending';
//     },
// }

export default MovieSlice.reducer;
export const MovieActions = {
  ...MovieSlice.actions,
  getAllMovies,
};
