import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IShop } from 'types';
import { IShopWithOwnerPickValues } from 'redux/services/shopApi/shopApi.types';
import { setUser, logout } from 'redux/features/userSlice';

interface IInitialShopState {
  currentShop: IShopWithOwnerPickValues | IShop | null;
  userShops: IShopWithOwnerPickValues[] | IShop[];
}

const initialState: IInitialShopState = {
  currentShop: null,
  userShops: [],
};

export const shopSlice = createSlice({
  initialState,
  name: 'shopSlice',
  reducers: {
    setShop: (
      state,
      action: PayloadAction<IShopWithOwnerPickValues | IShop>
    ) => {
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
