import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios/axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessionStorage } from "../../helpers/sessionStorage";

export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", { ...params });
      return { phone: data.phone, name: data.name };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", { ...params });
      if (data.role !== "USER") {
        return thunkAPI.rejectWithValue("INVALID_PHONE_OR_PASWORD");
      }
      if (data.accessToken) {
        if (thunkAPI.getState().auth.rememberMe) {
          await AsyncStorage.setItem("accessToken", data.accessToken);
        } else {
          sessionStorage.token = data.accessToken;
        }
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCode = createAsyncThunk("auth/fetchCode", async (params) => {
  const { data } = await axios.post("/auth/verifyCode", { ...params });
  console.log(data);
  if (data.accessToken) {
    await AsyncStorage.setItem("accessToken", data.accessToken);
  }
  return data;
});

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async ({ expoPushToken, ip }) => {
    const { data } = await axios.get("/auth", {
      params: { expoPushToken, ip },
    });
    if (data.role !== "USER") {
      return thunkAPI.rejectWithValue();
    }
    if (data.accessToken) {
      await AsyncStorage.setItem("accessToken", data.accessToken);
    }
    return data;
  }
);

const initialState = {
  user: null,
  status: "waiting",
  errorMessage: null,
  isSignUpDataValid: false,
  isWaitingCode: false,
  isInvalidCode: false,
  rememberMe: true,
  password: null,
  phone: null,
  name: null,
  expoPushToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.removeItem("accessToken");
      state.user = null;
      state.phone = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    changeNewMessagesStatus: (state, action) => {
      state.user = { ...state.user, hasMessage: action.payload };
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      state.isWaitingCode = true;
    },
    resetIsSignUpDataValid: (state) => {
      state.isSignUpDataValid = false;
    },
    resetIsWaitingCode: (state) => {
      state.isWaitingCode = false;
    },
    deleteFirstInvitation: (state) => {
      state.user.invitations.shift();
    },
    resetErrorMessage: (state) => {
      state.errorMessage = null;
    },
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.errorMessage = null;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.isSignUpDataValid = true;
      state.isInvalidCode = false;
    });
    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isSignUpDataValid = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMessage = null;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errorMessage = action.payload;
    });
    builder.addCase(fetchCode.pending, (state) => {
      state.user = null;
    });
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchCode.rejected, (state) => {
      state.user = null;
      state.isInvalidCode = true;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.user = null;
      state.status = "loading";
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.user = null;
      state.status = "error";
    });
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

export const {
  logout,
  setUser,
  toggleRememberMe,
  setPassword,
  resetIsSignUpDataValid,
  resetIsWaitingCode,
  resetErrorMessage,
  changeNewMessagesStatus,
  deleteFirstInvitation,
  setExpoPushToken,
} = authSlice.actions;
