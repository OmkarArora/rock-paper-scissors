import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLeaderboard } from "./leaderboardSlice";
import "./leaderboard.css";

export const Leaderboard = () => {
  const { status, leaderboard } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" && !leaderboard) {
      dispatch(getLeaderboard());
    }
  }, [dispatch, leaderboard, status]);

  return (
    <div className="leaderboard">
      {status === "loading" && "Loading..."}
      <table className="table-leaderboard">
        <thead>
          <th>Rank</th>
          <th>User</th>
          <th>Score</th>
        </thead>
        <tbody>
          {leaderboard &&
            leaderboard.games &&
            leaderboard.games.map(({ _id, score, user }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{`${score.user}-${score.cpu}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
