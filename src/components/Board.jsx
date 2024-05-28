import React from 'react';
import { BoardContainer, SquareButton } from './GameStyles';

const Board = ({ squares, onClick }) => {
  return (
    <BoardContainer>
      {squares.map((square, i) => (
        <SquareButton key={i} value={square} onClick={() => onClick(i)}>
          {square}
        </SquareButton>
      ))}
    </BoardContainer>
  );
};

export default Board;