import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Login, SignUp, Game, Leaderboard } from "./features";
import {
  getUserDetailsFromUsername,
  logoutUser,
} from "./features/authentication/authSlice";
import { setupAuthHeaderForServiceCalls } from "./helper";
import Logo from "./assets/puzzle.png";

import "./App.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container-actions">
      <button className="btn-action" onClick={() => navigate("/game")}>
        Start New Game
      </button>
      <button className="btn-action" onClick={() => navigate("/leaderboard")}>
        Leaderboard
      </button>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, token, userData } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token);
  }, [token]);

  useEffect(() => {
    let login = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME)
    );
    if (login && !userData) {
      dispatch(getUserDetailsFromUsername({ username: login.username }));
    }
  }, [userData, dispatch]);

  useEffect(() => {
    // Setup Auth Exception Handler
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          dispatch(logoutUser());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch, navigate]);

  return (
    <div className="App">
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
                className="btn-secondary"
                onClick={() => dispatch(logoutUser())}
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <PrivateRoute path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
