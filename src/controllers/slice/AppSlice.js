import {createSlice} from '@reduxjs/toolkit';

const initial = {
  value: 0,
  userInfo: {
    avatar: '',
  },
  token: null,
};

const AppSlice = createSlice({
  name: 'app',
  initialState: initial,
  reducers: actions,
});

const actions = {
  setUserInfo: (state, actions) => {
    state.userInfo = actions.payload;
  },
  setToken: (state, actions) => {
    state.token = actions.payload;
  },
};

export default AppSlice.reducer;
export const AppActions = {
  ...AppSlice.actions,
};
