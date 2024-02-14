import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stadion: null,
  date: null,
  time: null,
  players: [],
};

const createGameSlice = createSlice({
  name: 'createGame',
  initialState,
  reducers: {
    setStadion: (state, action) => {
      state.stadion = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const selectCreateGame = (state) => state.createGame;

export default createGameSlice.reducer;

export const { setStadion, setDate, setTime } = createGameSlice.actions;
