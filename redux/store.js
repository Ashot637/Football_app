import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice/authSlice';
import searchReducer from './searchSlice/searchSlice';
import notificationReducer from './notificationSlice/notificationSlice';
import createGameReducer from './createGameSlice/createGameSlice';
import createTeamReducer from './createTeamSlice/createTeamSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    notification: notificationReducer,
    createGame: createGameReducer,
    createTeam: createTeamReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
