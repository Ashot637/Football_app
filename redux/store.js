import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice/authSlice';
import searchReducer from './searchSlice/searchSlice';
import notificationReducer from './notificationSlice/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    notification: notificationReducer,
  },
});

export default store;
