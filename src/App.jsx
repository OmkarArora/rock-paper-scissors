import React from "react";
import { Routes, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import { Counter, Login } from "./features";
import "./App.css";

function Game() {
  return <div>Game</div>;
}

function Home() {
  return <div>Home</div>;
}

function App() {
  return (
    <div className="App">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <PrivateRoute path="/game" element={<Game />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
