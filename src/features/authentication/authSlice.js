import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/login`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserDetailsFromUsername = createAsyncThunk(
  "auth/getUserDetailsFromUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users/username`,
        { username }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

let login = JSON.parse(
  localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME)
);
let local_token = login?.token || null;
let userLoginStatus = local_token ? true : false;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    error: null,
    isUserLoggedIn: userLoginStatus,
    token: local_token,
    userData: null,
  },
  reducers: {
    // setLoginDetails: (state, action) => {
    //   state.token = action.payload.token;
    //   state.isUserLoggedIn = true;
    // },
    logoutUser: (state) => {
      localStorage?.removeItem(process.env.REACT_APP_LOCALSTORAGE_NAME);
      state.token = null;
      state.userData = null;
      state.isUserLoggedIn = false;
    },
    // setUserDetails: (state, action) => {
    //   state.userData = action.payload.userData;
    // },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.userData = user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.error = null;
      state.status = "fulfilled";

      localStorage?.setItem(
        process.env.REACT_APP_LOCALSTORAGE_NAME,
        JSON.stringify({
          username: user.username,
          userId: user._id,
          token: action.payload.token,
        })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.userData = user;
      state.token = action.payload.token;
      state.isUserLoggedIn = true;
      state.error = null;
      state.status = "fulfilled";

      localStorage?.setItem(
        process.env.REACT_APP_LOCALSTORAGE_NAME,
        JSON.stringify({
          username: user.username,
          userId: user._id,
          token: action.payload.token,
        })
      );
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
    [getUserDetailsFromUsername.pending]: (state) => {
      state.status = "loading";
    },
    [getUserDetailsFromUsername.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.userData = user;

      localStorage?.setItem(
        process.env.REACT_APP_LOCALSTORAGE_NAME,
        JSON.stringify({
          username: user.username,
          userId: user._id,
          token: state.token,
        })
      );
      state.status = "success";
    },
    [getUserDetailsFromUsername.rejected]: (state, action) => {
      state.status = "error";
      if (action.payload && action.payload.errorMessage)
        state.error = action.payload.errorMessage;
      else state.error = "Something went wrong";
    },
  },
});

// export const { setLoginDetails, logoutUser, setUserDetails } =authSlice.actions;
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
