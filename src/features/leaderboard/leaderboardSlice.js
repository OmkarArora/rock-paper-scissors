import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/leaderboards`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    status: "idle",
    error: null,
    leaderboard: null,
  },
  reducers: {},
  extraReducers: {
    [getLeaderboard.pending]: (state) => {
      state.status = "loading";
    },
    [getLeaderboard.fulfilled]: (state, action) => {
      state.leaderboard = action.payload.leaderboard;
      state.status = "fulfilled";
    },
    [getLeaderboard.rejected]: (state) => {
      state.error = "Error in creating a game";
      state.status = "error";
    },
  },
});

export default leaderboardSlice.reducer;
