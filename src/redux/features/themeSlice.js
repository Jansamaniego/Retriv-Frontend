import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  initialState,
  name: 'themeSlice',
  reducers: {
    setTheme: (state, { payload: theme }) => {
      state.theme = theme;
    },
  },
});

export default themeSlice.reducer;

export const { setTheme } = themeSlice.actions;
