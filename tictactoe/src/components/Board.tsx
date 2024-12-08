import { useState } from "react";
//Makes the Sqaure boxes required for the Game
function Square({ value, onClicked }) {
  return (
    <button
      className="square"
      style={{ cursor: "pointer" }}
      onClick={onClicked}
    >
      {value}
    </button>
  );
}
// Handles the logic of the Game
function Board({ nextXValue, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextXValue ? "X" : "O";
    onPlay(nextSquares);
  }
  // Monitor who is the winner logic
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  //Optimizing the H6 tag for showing the results
  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next Player: " + (nextXValue ? "X" : "O");

  return (
    <>
      <h6>{status}</h6>
      <div className="board-row">
        <Square value={squares[0]} onClicked={() => handleClick(0)} />
        <Square value={squares[1]} onClicked={() => handleClick(1)} />
        <Square value={squares[2]} onClicked={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClicked={() => handleClick(3)} />
        <Square value={squares[4]} onClicked={() => handleClick(4)} />
        <Square value={squares[5]} onClicked={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClicked={() => handleClick(6)} />
        <Square value={squares[7]} onClicked={() => handleClick(7)} />
        <Square value={squares[8]} onClicked={() => handleClick(8)} />
      </div>
    </>
  );
}
// Main Component Game
function Game() {
  const [nextXValue, setNextXValue] = useState(true); // Manages wheather the next value is 'X' or 'O'
  const [history, setHistory] = useState([Array(9).fill(null)]); // Manages the Histroy of the Game
  const [currentMove, setCurrentMove] = useState(0); // Manages the currentMove of the Game
  const currentSquares = history[currentMove]; // Assigning the currentMove of the Game
  // Function to handle onClick
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setNextXValue(!nextXValue);
  }
  // Function to jump to a particular step
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setNextXValue(nextMove % 2 === 0);
  }
  // Function to create buttons for moving to a particular step
  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Move to Step#" + move : "Go to Start";
    return (
      <li key={move}>
        <button
          style={{ margin: "5px" }}
          className="btn btn-primary"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            nextXValue={nextXValue}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;
