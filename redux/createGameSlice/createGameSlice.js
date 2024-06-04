import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stadion: null,
  group: null,
  date: null,
  time: null,
  uniforms: [],
  price: null,
  duration: null,
  range: 1,
  needRefresh: false,
  // players: [],
};

const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    setNeedRefresh: (state) => {
      state.needRefresh = Math.random();
    },
    setGameData: (state, action) => {
      state.stadion = action.payload.stadion;
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.price = action.payload.price;
      state.uniforms = action.payload.uniforms;
      state.duration = action.payload.duration;
    },
    setStadion: (state, action) => {
      state.stadion = action.payload;
    },
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setUniforms: (state, action) => {
      state.uniforms.includes(action.payload)
        ? (state.uniforms = state.uniforms.filter((i) => i !== action.payload))
        : (state.uniforms = [...state.uniforms, action.payload]);
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
      state.group = null;
      state.range = 1;
      state.time = null;
      // state.players = [];
    },
  },
});

export const selectCreateGame = (state) => state.createGame;

export default createGameSlice.reducer;

export const {
  setGameData,
  setStadion,
  setGroup,
  setDate,
  setTime,
  setUniforms,
  reset,
  setPrice,
  setNeedRefresh,
  // addPlayer,
  // removePlayer,
  setRange,
  setDuration,
} = createGameSlice.actions;
