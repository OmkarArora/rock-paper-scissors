import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Login, SignUp, Game, Leaderboard, Navbar, Loader } from "./features";
import {
  getUserDetailsFromUsername,
  logoutUser,
} from "./features/authentication/authSlice";
import { setupAuthHeaderForServiceCalls } from "./helper";
import HeroImage from "./assets/rps-game.gif";
import "./App.css";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <img src={HeroImage} alt="rock-paper-scissors" className="img-hero" />
      <div className="container-actions">
        <button
          className="btn-primary rounded"
          onClick={() => navigate("/game")}
        >
          Start New Game
        </button>
        <button
          className="btn-primary rounded"
          onClick={() => navigate("/leaderboard")}
        >
          Leaderboard
        </button>
      </div>
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userData, status } = useSelector((state) => state.auth);

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
      <Navbar />
      {status === "loading" && <Loader text="loading user..." />}
      <main>
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
