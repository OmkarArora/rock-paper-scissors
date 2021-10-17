import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Login, SignUp, Game } from "./features";
import { logoutUser } from "./features/authentication/authSlice";
import { setupAuthHeaderForServiceCalls } from "./helper";
import "./App.css";

function Home() {
  return <div>Home</div>;
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setupAuthHeaderForServiceCalls(token);
  }, [token]);

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
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/game")}>Game</button>
        {isUserLoggedIn ? (
          <button onClick={() => dispatch(logoutUser())}>Log out</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </nav>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <PrivateRoute path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
