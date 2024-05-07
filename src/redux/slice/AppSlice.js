import {createSlice} from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export default AppSlice.reducer;
export const AppActions = {
  ...AppSlice.actions,
};
