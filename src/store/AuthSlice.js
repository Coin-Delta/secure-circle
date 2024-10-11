import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userDetails: null,
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logIn(state, { payload }) {
      state.isLoggedIn = true;
      state.userDetails = payload;
    },
    logOut() {
      return { ...initialState };
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice;
