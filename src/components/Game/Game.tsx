
import { useState } from 'react';
import { CellStateOption } from '../../enums';
import { getInitialBoard, getBestMove, getWinnerPath } from '../utils';
import Board from '../Board';

const getNewBoardAfterClick = (board: CellStateOption[], idx: number) => {
  const newBoard = board.slice();
  // assign user click
  newBoard[idx] = CellStateOption.O;

  // assign AI click
  const bestMoveIdx = getBestMove(newBoard);
  newBoard[bestMoveIdx] = CellStateOption.X;
  return newBoard;
};

function Game() {
  const [board, setBoard] = useState(getInitialBoard());
  const [winnerPath, setWinnerPath] = useState(new Set() as Set<number>);
  const onCellClick = (clickedCellIdx: number) => {
    if (winnerPath.size || board[clickedCellIdx] !== CellStateOption.EMPTY) return;
    const newBoardState = getNewBoardAfterClick(board, clickedCellIdx);
    setBoard(newBoardState);
    setWinnerPath(new Set(getWinnerPath(newBoardState)));
  };

  const resetGameClicked = () => {
    setBoard(getInitialBoard());
    setWinnerPath(new Set());
  };

  return (
    <>
      <button className="reset-btn" onClick={resetGameClicked}>Reset</button>
      <Board winnerPath={winnerPath} board={board} onCellClick={onCellClick} />
    </>
  );
}

export default Game;
