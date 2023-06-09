import { createSlice } from '@reduxjs/toolkit';
import { setUser, logout } from './userSlice';

const initialState = {
  currentShop: null,
};

export const shopSlice = createSlice({
  initialState,
  name: 'shopSlice',
  reducers: {
    setShop: (state, { payload: shop }) => {
      state.currentShop = shop;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, { payload: user }) => {
      state.currentShop = user.defaultShop;
    });
    builder.addCase(logout, () => initialState);
  },
});

export default shopSlice.reducer;

export const { setShop } = shopSlice.actions;
