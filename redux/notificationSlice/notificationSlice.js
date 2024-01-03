import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  from: 'home',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
  },
});

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;

export const { setFrom } = notificationSlice.actions;
