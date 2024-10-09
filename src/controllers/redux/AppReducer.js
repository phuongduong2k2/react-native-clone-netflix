import {combineReducers, combineSlices} from '@reduxjs/toolkit';
import app from '../slice/AppSlice';

const RootReducer = combineReducers({
  app,
});

export default RootReducer;
