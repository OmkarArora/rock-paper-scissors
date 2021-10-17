import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import gameReducer from "../features/game/gameSlice";
import leaderboardReducer from "../features/leaderboard/leaderboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
  },
});
