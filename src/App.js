import logo from './logo.svg';
import './App.css';
import React from "react";
import Header from "./bingo-game/Header/Header";
import Board from "./bingo-game/Board/Board";

function App() {

  return (
    <div className="App">
      <div className="game-board">
        <Board />
      </div>

    </div>
  );
}

export default App;
