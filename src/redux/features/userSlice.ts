import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'src/types';

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
    setUser: (state: IInitialUserState, action: PayloadAction<ISetUser>) => {
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
