import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createGame = createAsyncThunk(
  "game/createGame",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/games/create`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateScore = createAsyncThunk(
  "game/updateScore",
  async ({ game }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/games/score`,
        { game }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    status: "idle",
    error: null,
    gameData: null,
  },
  reducers: {},
  extraReducers: {
    [createGame.pending]: (state) => {
      state.status = "loading";
    },
    [createGame.fulfilled]: (state, action) => {
      state.gameData = action.payload.game;
      state.status = "fulfilled";
    },
    [createGame.rejected]: (state) => {
      state.error = "Error in creating a game";
      state.status = "error";
    },
    [updateScore.pending]: (state) => {
      state.status = "loading";
    },
    [updateScore.fulfilled]: (state, action) => {
      state.gameData = action.payload.game;
      state.status = "fulfilled";
    },
    [updateScore.rejected]: (state) => {
      state.error = "Error in updating scores";
      state.status = "error";
    },
  },
});

export default gameSlice.reducer;
