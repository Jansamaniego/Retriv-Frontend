import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, { payload: user }) => {
      console.log('hey');
      state.user = user;
    },
  },
});

export default userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
