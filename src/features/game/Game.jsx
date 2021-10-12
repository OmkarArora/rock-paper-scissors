import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "./gameSlice";
import { RockPaperScissors } from "./RockPaperScissors";

export const Game = () => {
  const [isGameActive, setGameStatus] = useState(false);
  const { status, gameData } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  function startGame() {
    dispatch(createGame());
  }

  useEffect(() => {
    if (status === "fulfilled" && gameData) {
      setGameStatus(true);
    }
  }, [status, gameData]);

  return (
    <div>
      {!isGameActive && <button onClick={startGame}>Start new game</button>}
      {status === "loading" && <div>creating game...</div>}
      {isGameActive && <RockPaperScissors game={gameData} />}
    </div>
  );
};
