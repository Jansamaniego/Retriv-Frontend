import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialThemeState {
  theme: string;
}

const initialState: IInitialThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  initialState,
  name: 'themeSlice',
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
