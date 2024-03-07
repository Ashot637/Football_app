import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stadion: null,
  date: null,
  time: null,
  // players: [],
  uniforms: [],
  price: null,
  duration: null,
  range: 1,
};

const createGameSlice = createSlice({
  name: 'createGame',
  initialState,
  reducers: {
    setStadion: (state, action) => {
      state.stadion = action.payload;
      // state.time = null;
    },
    setDate: (state, action) => {
      state.date = action.payload;
      // state.time = null;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setUniforms: (state, action) => {
      if (state.uniforms.length === 2 && !state.uniforms.includes(action.payload)) {
        state.uniforms = [state.uniforms[1], action.payload];
      } else {
        state.uniforms.includes(action.payload)
          ? (state.uniforms = state.uniforms.filter((i) => i !== action.payload))
          : (state.uniforms = [...state.uniforms, action.payload]);
      }
    },
    // addPlayer: (state, action) => {
    //   state.players = [...state.players, action.payload];
    // },
    // removePlayer: (state, action) => {
    //   state.players = state.players.filter((_, index) => index !== action.payload);
    // },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRange: (state, action) => {
      state.range = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    reset: (state) => {
      state.time = null;
      state.date = null;
      state.price = null;
      state.uniforms = [];
      // state.players = [];
    },
  },
});

export const selectCreateGame = (state) => state.createGame;

export default createGameSlice.reducer;

export const {
  setStadion,
  setDate,
  setTime,
  setUniforms,
  reset,
  setPrice,
  // addPlayer,
  // removePlayer,
  setRange,
  setDuration,
} = createGameSlice.actions;
