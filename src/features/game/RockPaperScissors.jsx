import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { randomNumberInRange } from "../../helper";
import { updateScore } from "./gameSlice";
import {
  FaRandom,
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
} from "react-icons/fa";

export const RockPaperScissors = ({ game }) => {
  const { numOfRounds } = game;
  const [playerMove, setPlayerMove] = useState(null);
  const [cpuMove, setCpuMove] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const [moveStatus, setMoveStatus] = useState("success");
  const [moveTimeout, setMoveTimeout] = useState(null);

  const [currentRound, setRound] = useState(1);

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
      }, 200);
      setMoveTimeout(timeout);
    })();
  }

  function computeResult(playerMove, cpuMove) {
    if (playerMove === cpuMove) return;
    if (winningConditions[playerMove] === cpuMove) {
      setPlayerScore((prev) => prev + 1);
    } else setCpuScore((prev) => prev + 1);
  }

  function getMoveIcon(move) {
    if (move === "rock") return <FaHandRock />;
    if (move === "paper") return <FaHandPaper />;
    if (move === "scissors") return <FaHandScissors />;
    return <FaRandom />;
  }

  return (
    <div className="container-game">
      <div>
        {currentRound > numOfRounds ? (
          "FINAL SCORES"
        ) : (
          <>ROUND {currentRound}</>
        )}
      </div>
      <div className="scores">
        <div>
          Player <div>{playerScore}</div>
        </div>
        <div>
          CPU <div>{cpuScore}</div>
        </div>
      </div>
      <div className="container-moves">
        <div>
          <span className="icon-move">
            {moveStatus !== "loading" && getMoveIcon(playerMove)}
          </span>
        </div>
        <div>
          <span className="icon-move">
            {moveStatus !== "loading" && getMoveIcon(cpuMove)}
          </span>
        </div>
      </div>
      {currentRound <= numOfRounds && (
        <>
          <div className="container-moves">
            <button className="btn-move" onClick={() => clickMove("rock")}>
              <FaHandRock />
            </button>
            <button className="btn-move" onClick={() => clickMove("paper")}>
              <FaHandPaper />
            </button>
            <button className="btn-move" onClick={() => clickMove("scissors")}>
              <FaHandScissors />
            </button>
          </div>
          {moveStatus === "loading" && <div>Randomizing moves</div>}
        </>
      )}
      {currentRound > numOfRounds && (
        <button
          onClick={() => {
            let _game = {
              _id: game._id,
              score: { user: playerScore, cpu: cpuScore },
            };
            dispatch(updateScore({ game: _game }));
            navigate("/");
          }}
          className="btn-primary rounded"
        >
          Save and Exit
        </button>
      )}
    </div>
  );
};
