import React, { useState, useEffect } from 'react';
import Board from './Board';
import { GameContainer, GameInfo, Status, Score, ModeButton, RestartButton } from './GameStyles';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('easy');
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    if (!xIsNext) {
      const aiMove = mode === 'hard' ? getAIMove(history[stepNumber].squares) : getRandomMove(history[stepNumber].squares);
      if (aiMove !== -1) {
        handleClick(aiMove);
      }
    }
  }, [xIsNext, mode, stepNumber]);

  const handleClick = (i) => {
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToCurrentStep.concat([{ squares }]));
    setStepNumber(historyUpToCurrentStep.length);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === 'X') {
        setScore({ ...score, wins: score.wins + 1 });
      } else {
        setScore({ ...score, losses: score.losses + 1 });
      }
    } else if (squares.every(square => square !== null)) {
      setScore({ ...score, draws: score.draws + 1 });
    }
  };

  const getRandomMove = (squares) => {
    const availableSquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
    if (availableSquares.length > 0) {
      return availableSquares[Math.floor(Math.random() * availableSquares.length)];
    }
    return -1;
  };

  const getAIMove = (squares) => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (squares.every(square => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'O';
          const score = minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = 'X';
          const score = minimax(squares, depth + 1, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    resetGame();
  };

  const handleRestart = () => {
    resetGame();
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = winner === 'X' ? 'You win!' : 'You lose';
  } else if (current.squares.every(square => square !== null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <GameContainer>
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <GameInfo>
        <Status>{status}</Status>
        <Score>Wins: {score.wins} | Losses: {score.losses} | Draws: {score.draws}</Score>
        <ModeButton onClick={() => handleModeChange('easy')}>Easy Mode</ModeButton>
        <ModeButton onClick={() => handleModeChange('hard')}>Hard Mode</ModeButton>
        <RestartButton onClick={handleRestart}>Restart</RestartButton>
      </GameInfo>
    </GameContainer>
  );
};

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;