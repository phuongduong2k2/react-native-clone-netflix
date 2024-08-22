import {createSlice} from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
    userInfo: null,
    token: null,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    setUserInfo: (state, actions) => {
      state.userInfo = actions.payload;
    },
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
  },
});

export default AppSlice.reducer;
export const AppActions = {
  ...AppSlice.actions,
};
