import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'src/types';
import { IShopWithOwnerPickValues } from '../services/shopApi/shopApi.types';

interface ITransformedUser extends IUser {
  shop: IShopWithOwnerPickValues;
}

export interface IInitialUserState {
  user: IUser | null;
}

interface ISetUser {
  user: IUser;
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
