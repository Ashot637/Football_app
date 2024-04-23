import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  fromSearchIcon: false,
  term: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
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

export const { setFromSearchIcon, setTerm, toggleIsOpen } = searchSlice.actions;
