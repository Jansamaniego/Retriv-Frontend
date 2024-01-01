import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialTokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

const initialState: IInitialTokenState = {
  accessToken: null,
  refreshToken: null,
};

export const tokenSlice = createSlice({
  initialState,
  name: 'tokenSlice',
  reducers: {
    setTokens: (state: IInitialTokenState, action: PayloadAction<ITokens>) => {
      console.log(action.payload);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export default tokenSlice.reducer;

export const { setTokens } = tokenSlice.actions;
