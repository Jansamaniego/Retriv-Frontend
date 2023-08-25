import { createSlice } from '@reduxjs/toolkit';
import { setUser, logout } from './userSlice';

const initialState = {
  currentShop: null,
  userShops: [],
};

export const shopSlice = createSlice({
  initialState,
  name: 'shopSlice',
  reducers: {
    setShop: (state, { payload: shop }) => {
      state.currentShop = shop;
    },
    removeShop: (state) => {
      if (state.userShops.length !== 0) {
        state.currentShop = state.userShops[0];
      } else {
        state.currentShop = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, { payload: user }) => {
      state.userShops = user.shops;
    });
    builder.addCase(logout, () => initialState);
  },
});

export default shopSlice.reducer;

export const { setShop, removeShop } = shopSlice.actions;
