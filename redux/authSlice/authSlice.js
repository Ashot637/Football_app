import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios/axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchSignup = createAsyncThunk('auth/fetchSignup', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/register', { ...params });
    return data.phone;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/login', { ...params });
    return data.phone;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchCode = createAsyncThunk('auth/fetchCode', async (params, { getState }) => {
  const { data } = await axios.post('/auth/verifyCode', { ...params });
  if (data.accessToken) {
    await AsyncStorage.setItem('accessToken', data.accessToken);
  }
  return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth');
  if (data.accessToken) {
    await AsyncStorage.setItem('accessToken', data.accessToken);
  }
  return data;
});

const initialState = {
  user: null,
  status: 'waiting',
  errorMessage: null,
  isWaitingCode: false,
  isInvalidCode: false,
  rememberMe: true,
  phone: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem('accessToken');
      state.user = null;
    },
    resetIsWaitingCode: (state) => {
      state.isWaitingCode = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.errorMessage = null;
      state.isWaitingCode = true;
      state.isInvalidCode = false;
      state.phone = action.payload;
    });
    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isWaitingCode = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.errorMessage = null;
      state.isWaitingCode = true;
      state.isInvalidCode = false;
      state.phone = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isWaitingCode = false;
    });
    builder.addCase(fetchCode.pending, (state) => {
      state.user = null;
      state.status = 'loading';
    });
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchCode.rejected, (state) => {
      state.user = null;
      state.status = 'error';
      state.isInvalidCode = true;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.user = null;
      state.status = 'loading';
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.user = null;
      state.status = 'error';
    });
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

export const { logout, resetIsWaitingCode, setUser, toggleRememberMe } = authSlice.actions;
