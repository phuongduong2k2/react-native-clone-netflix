import {combineReducers, combineSlices} from '@reduxjs/toolkit';
import app from '../slice/AppSlice';
import movie from '../slice/MovieSlice';

const RootReducer = combineReducers({
  app,
  movie,
});

export default RootReducer;
