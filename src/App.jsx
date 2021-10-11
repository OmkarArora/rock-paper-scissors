import React from "react";
import { Routes, Route, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Counter, Login, SignUp, Game } from "./features";
import { logoutUser } from "./features/authentication/authSlice";
import "./App.css";

function Home() {
  return <div>Home</div>;
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/game")}>Game</button>
        <button onClick={() => navigate("/counter")}>Counter</button>
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
          <Route path="/counter" element={<Counter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
