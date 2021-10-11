import { useState } from "react";
import { RPSgame } from "./RPSgame";

export const Game = () => {
  const [isGameActive, setGameStatus] = useState(false);

  return (
    <div>
      {!isGameActive && (
        <button onClick={() => setGameStatus(true)}>Start new game</button>
      )}
      {isGameActive && <RPSgame />}
    </div>
  );
};
