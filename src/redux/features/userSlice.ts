import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from 'types';
import { IShopWithOwnerPickValues } from 'redux/services/shopApi/shopApi.types';
import { IUserWithModifiedShops } from 'redux/services/userApi/userApi.types';

export interface IInitialUserState {
  user: IUser | null;
}

const initialState: IInitialUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state: IInitialUserState, action: PayloadAction<void>) =>
      initialState,
    setUser: (state: IInitialUserState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
