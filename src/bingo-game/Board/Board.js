import React from "react";
import {  AppBar, Toolbar, Button, Typography  } from "@mui/material";
import Square from "../Square/Square";
import Header from "../Header/Header";
import Dictionary from "../Dictionary";
import {Replay, ChangeCircle } from '@mui/icons-material';
import "./Board.css";

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: this.generateInitialBoard(),
      gameOver: false,
      playingField: this.generateRandomWord()
    };
    this.handleRestart = this.handleRestart.bind(this);

  };

  generateRandomWord() {
    const index = Math.floor(Math.random() * Dictionary.length);
    return Dictionary[index];
  }

  generateInitialBoard() {
    const usedWords = new Set();
    const board = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        let word = this.generateRandomWord();
        while (usedWords.has(word)) {
          word = this.generateRandomWord();
        }
        usedWords.add(word);
        row.push({ word, clicked: false, isBingo: false });
      }
      board.push(row); 
    
    }
   
    return board;
  }

  handleClick(rowIndex, colIndex) {
    const { gameOver, board } = this.state;
    if (gameOver || board[rowIndex][colIndex].clicked) return;
    // if (board[rowIndex][colIndex].word !== this.props.word) return;
            
           
            this.setState({playingField: this.generateRandomWord()});
  
    const newBoard = [...board];
    newBoard[rowIndex][colIndex].clicked = true;
    this.setState({ board: newBoard });
   const winingSquare = this.checkForBingo(newBoard, rowIndex, colIndex);
  
  };

  checkForBingo(currentBoard, rowIndex, colIndex) {
    const isBingo = (line) => line.every((square) => square.clicked);
    const lingBingo = [];
   
 // Check rows for bingo
  for (let i = 0; i < 5; i++) {
    if (isBingo(currentBoard[i])) {
      this.setState({ gameOver: true });
      this.markBingoSquares(currentBoard, i, 0, 0, 1);
      break;
    }
  }

  // Check columns for bingo
  for (let i = 0; i < 5; i++) {
    const col = currentBoard.map(row => row[i]);
    if (isBingo(col)) {
      this.setState({ gameOver: true });
      this.markBingoSquares(currentBoard, 0, i, 1, 0); 
      break;
    }
  }

  // Check main diagonal for bingo
  if (rowIndex === colIndex) {
    if (isBingo(currentBoard.map((row, index) => row[index]))) {
      this.setState({ gameOver: true });
      this.markBingoSquares(currentBoard, 0, 0, 1, 1);
      return;
    }
  }

  if (rowIndex + colIndex === 4) {
    if (isBingo(currentBoard.map((row, index) => row[4 - index]))) {
     this.setState({ gameOver: true });
      this.markBingoSquares(currentBoard, 0, 4, 1, -1);
    }
  }

  };

  markBingoSquares( currentBoard,startRowIndex, startColIndex,rowIncrement, colIncrement) {
    const newBoard = [...currentBoard];
    const bingoSquares = [];
    let rowIndex = startRowIndex;
    let colIndex = startColIndex;

    // Mark squares as bingo until out of bounds or until bingo is not detected
    while (rowIndex >= 0 && rowIndex < 5 && colIndex >= 0 && colIndex < 5
    ) {
      newBoard[rowIndex][colIndex].isBingo = true;
      bingoSquares.push({ row: rowIndex, col: colIndex });
      rowIndex += rowIncrement;
      colIndex += colIncrement;
    }
    
    this.setState({ board: newBoard, bingoSquares });
  }



   handleRestart() {
     this.setState({ board: this.generateInitialBoard(), gameOver: false });
     this.setState({ playingField: this.generateRandomWord()});
    
  };
 changeTheWord(){
     this.setState({ playingField: this.generateRandomWord()});

}
  render() {
    return (
      
      <div className="board">
      <Header  changeTheWord={this.changeTheWord} handleRestart={this.handleRestart}/>
        <div className="playing-field">
        
        {this.state.gameOver ? (
          <h1 className="bingo-sucess">BINGO!</h1>
        ) : (
          <h1 className="word-display">{this.state.playingField}</h1>
        )}
          
          <Button className="board-btn" variant="contained" onClick={() => this.changeTheWord()} startIcon={<ChangeCircle />}>
         Change the Word
        </Button>
        
        </div>

        {this.state.board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((square, colIndex) => (
              <Square
                key={colIndex}
                isBingo={square.isBingo}
                value={square.word}
                clicked={square.clicked}
                onClick={() => this.handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
        
      </div>
    );
  };
}

export default Board;
