import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromSearchIcon: false,
  term: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFromSearchIcon: (state, action) => {
      state.fromSearchIcon = action.payload;
    },
    setTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;

export const { setFromSearchIcon, setTerm } = searchSlice.actions;
