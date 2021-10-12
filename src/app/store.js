import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    game: gameReducer,
  },
});
