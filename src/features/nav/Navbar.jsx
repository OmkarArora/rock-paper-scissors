import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../authentication/authSlice";
import Logo from "../../assets/puzzle.png";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, userData } = useSelector((state) => state.auth);

  return (
    <nav>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="puzzle" />
        Rock Paper Scissors
      </div>
      <div>
        {isUserLoggedIn ? (
          <div className="log-info">
            <div className="user-info">
              {userData && (
                <span>
                  <img
                    src={`https://avatars.dicebear.com/api/croodles/:${userData.username}.svg`}
                    alt="avatar"
                  />
                  {userData.username}
                </span>
              )}
            </div>
            <button
              className="btn-secondary rounded"
              onClick={() => dispatch(logoutUser())}
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            className="btn-secondary rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
