import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLeaderboard } from "./leaderboardSlice";

export const Leaderboard = () => {
  const { status, leaderboard } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" && !leaderboard) {
      dispatch(getLeaderboard());
    }
  }, [dispatch, leaderboard, status]);

  return (
    <div>
      {status === "loading" && "Loading..."}
      <table>
        <thead>
          <th>User</th>
          <th>Score</th>
        </thead>
        <tbody>
          {leaderboard &&
            leaderboard.games &&
            leaderboard.games.map(({ _id, score, user }) => (
              <tr key={_id}>
                <td>{user.username}</td>
                <td>{`${score.user}-${score.cpu}`}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
