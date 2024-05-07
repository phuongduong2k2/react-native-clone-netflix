import {configureStore} from '@reduxjs/toolkit';
import RootReducer from '../reducer';

const store = configureStore({
  reducer: RootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
