import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setUser, logout } from './userSlice';
import { IShop } from 'src/types';
import { IShopWithOwnerPickValues } from '../services/shopApi/shopApi.types';

interface IInitialShopState {
  currentShop: IShopWithOwnerPickValues | IShop | null;
  userShops: IShopWithOwnerPickValues[] | string[] | IShop[];
}

const initialState: IInitialShopState = {
  currentShop: null,
  userShops: [],
};

export const shopSlice = createSlice({
  initialState,
  name: 'shopSlice',
  reducers: {
    setShop: (state, action: PayloadAction<IShopWithOwnerPickValues>) => {
      state.currentShop = action.payload;
    },
    removeShop: (state, action: PayloadAction<void>) => {
      if (
        state.userShops.length !== 0 &&
        typeof state.userShops[0] !== 'string'
      ) {
        state.currentShop = state.userShops[0];
      } else {
        state.currentShop = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      if (action?.payload?.shops) {
        state.userShops = action.payload.shops;
      }
    });
    builder.addCase(logout, () => initialState);
  },
});

export default shopSlice.reducer;

export const { setShop, removeShop } = shopSlice.actions;
