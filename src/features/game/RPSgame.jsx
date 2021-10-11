import { useEffect, useState } from "react";
import { randomNumberInRange } from "../../helper";

export const RPSgame = () => {
  const [playerMove, setPlayerMove] = useState(null);
  const [cpuMove, setCpuMove] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [moveStatus, setMoveStatus] = useState("success");
  const [moveTimeout, setMoveTimeout] = useState(null);

  const moves = ["rock", "paper", "scissors"];

  let winningConditions = {
    /** Rock wins over Scissors */
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  useEffect(() => {
    return () => clearInterval(moveTimeout);
  });

  function clickMove(move) {
    setPlayerMove(move);
    (function () {
      setMoveStatus("loading");
      let timeout = setTimeout(() => {
        let randomMove = moves[randomNumberInRange(0, moves.length - 1)];
        setCpuMove(randomMove);
        setMoveStatus("success");
        computeResult(move, randomMove);
      }, 500);
      setMoveTimeout(timeout);
    })();
  }

  function computeResult(playerMove, cpuMove) {
    if (playerMove === cpuMove) return;
    if (winningConditions[playerMove] === cpuMove) {
      setPlayerScore((prev) => prev + 1);
    } else setCpuScore((prev) => prev + 1);
  }

  return (
    <div>
      <div>
        Scores:
        <div>player: {playerScore}</div>
        <div>CPU: {cpuScore}</div>
      </div>
      <div>
        Pick your move
        <button onClick={() => clickMove("rock")}>Rock</button>
        <button onClick={() => clickMove("paper")}>Paper</button>
        <button onClick={() => clickMove("scissors")}>Scissors</button>
      </div>
      {moveStatus === "loading" && <div>Loading</div>}
      {moveStatus === "success" && playerMove && cpuMove && (
        <div>
          <div>Your choice: {playerMove}</div>
          <div>CPU: {cpuMove}</div>
        </div>
      )}
    </div>
  );
};
