import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "./gameSlice";
import { RockPaperScissors } from "./RockPaperScissors";
import { Loader } from "..";
import { useAlert } from "react-alert";
import "./game.css";

export const Game = () => {
  const { status, gameData, error } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(createGame());
  }, [dispatch]);

  useEffect(() => {
    if (status === "error" && error) {
      alert.error(error);
    }
  }, [error, status, alert, dispatch]);

  return (
    <div className="main-game">
      {status === "loading" || !gameData ? (
        <Loader text="creating game..." />
      ) : (
        <RockPaperScissors game={gameData} />
      )}
    </div>
  );
};
