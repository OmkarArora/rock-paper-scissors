import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "./gameSlice";
import { RockPaperScissors } from "./RockPaperScissors";
import "./game.css";

export const Game = () => {
  const { status, gameData } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createGame());
  }, [dispatch]);

  return (
    <div className="main-game">
      {status === "loading" || !gameData ? (
        <div>creating game...</div>
      ) : (
        <RockPaperScissors game={gameData} />
      )}
    </div>
  );
};
