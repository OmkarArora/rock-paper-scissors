import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { randomNumberInRange } from "../../helper";
import { updateScore } from "./gameSlice";

export const RockPaperScissors = ({ game }) => {
  const { numOfRounds } = game;
  const [playerMove, setPlayerMove] = useState(null);
  const [cpuMove, setCpuMove] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [moveStatus, setMoveStatus] = useState("success");
  const [moveTimeout, setMoveTimeout] = useState(null);

  const [currentRound, setRound] = useState(1);
  const [isScoreUpdated, setScoreUpdateStatus] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!isScoreUpdated && currentRound > numOfRounds) {
      let _game = {
        _id: game._id,
        score: { user: playerScore, cpu: cpuScore },
      };
      dispatch(updateScore({ game: _game }));
      setScoreUpdateStatus(true);
    }
  }, [
    currentRound,
    numOfRounds,
    playerScore,
    cpuScore,
    game,
    isScoreUpdated,
    dispatch,
  ]);

  function clickMove(move) {
    setPlayerMove(move);
    (function () {
      setMoveStatus("loading");
      let timeout = setTimeout(() => {
        let randomMove = moves[randomNumberInRange(0, moves.length - 1)];
        setCpuMove(randomMove);
        setMoveStatus("success");
        computeResult(move, randomMove);
        setRound((prev) => prev + 1);
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
        {currentRound <= numOfRounds ? (
          <>Round: {currentRound}</>
        ) : (
          "Final Scores"
        )}
      </div>
      <div>
        Scores:
        <div>player: {playerScore}</div>
        <div>CPU: {cpuScore}</div>
      </div>
      {currentRound <= numOfRounds && (
        <>
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
        </>
      )}
      {currentRound > numOfRounds && (
        <button onClick={() => navigate("/")}>Home</button>
      )}
    </div>
  );
};
