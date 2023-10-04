import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialThemeState {
  theme: string;
}

interface ISetTheme {
  theme: string;
}

const initialState: IInitialThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  initialState,
  name: 'themeSlice',
  reducers: {
    setTheme: (state, action: PayloadAction<ISetTheme>) => {
      state.theme = action.payload.theme;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
