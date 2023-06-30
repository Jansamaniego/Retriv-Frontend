import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

export const searchSlice = createSlice({
  initialState,
  name: 'SearchSlice',
  reducers: {
    setQuery: (state, { payload: query }) => {
      state.query = query;
    },
  },
});

export default searchSlice.reducer;

export const { setQuery } = searchSlice.actions;
