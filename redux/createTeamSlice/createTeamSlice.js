import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: [], // Array to store all created teams
  currentTeam: null, // Store the currently active team
  needRefresh: false, 
};

const createTeamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      state.teams.push(action.payload); // Add a new team to the list
    },
    removeTeam: (state, action) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload); // Remove a team by ID
    },
    setCurrentTeam: (state, action) => {
      state.currentTeam = action.payload; // Set the active team
    },
    updateTeam: (state, action) => {
      const index = state.teams.findIndex((team) => team.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = action.payload; // Update the specific team by ID
      }
    },
    resetTeams: (state) => {
      state.teams = []; // Clear all teams
      state.currentTeam = null; // Optionally reset the current team
    },
    setNeedRefresh: (state) => {
        state.needRefresh = true; // Set the needRefresh flag to true
      },
      resetNeedRefresh: (state) => {
        state.needRefresh = false; // Optionally reset the needRefresh flag
      },  },
});

export const {
  addTeam,
  removeTeam,
  setCurrentTeam,
  updateTeam,
  resetTeams,
  setNeedRefresh, // Ensure this is included here
  resetNeedRefresh,
} = createTeamSlice.actions;

export default createTeamSlice.reducer;
