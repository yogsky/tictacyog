import { CellStateOption, WinnerOption } from "../enums";


const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winnerToScore = {
  [WinnerOption.X]: 100,
  [WinnerOption.O]: -100,
  [WinnerOption.TIE]: 0,
};

export const getInitialBoard = (): CellStateOption[] => {
  const board = Array(9).fill(1).map(() => CellStateOption.EMPTY);
  const randomInitialIndex = Math.floor(Math.random() * board.length);
  board[randomInitialIndex] = CellStateOption.X;
  return board;
};

export const getWinner = (board: CellStateOption[]): WinnerOption | null => {
  const isTie = board.every((cell) => cell !== CellStateOption.EMPTY);
  if (isTie) return WinnerOption.TIE;
  const winningPath = getWinnerPath(board);
  if (winningPath.length) return board[winningPath[0]] === CellStateOption.X ? WinnerOption.X : WinnerOption.O;
  return null;
};

export const getWinnerPath = (board: CellStateOption[]): number[] => {
  return winningCombos.find((combo) => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  }) || [];
};


const getScoreForPotentialBoard = (board: CellStateOption[], player = CellStateOption.O, depth = 1): number => {
  const winner = getWinner(board);
  if (winner) return winnerToScore[winner] / depth;
  const isAiTurn = player === CellStateOption.X;
  let bestScore = isAiTurn ? -Infinity : Infinity;
  const nextPlayer = isAiTurn ? CellStateOption.O : CellStateOption.X;
  const targetOperation = isAiTurn ? Math.max : Math.min;
  for (let index = 0; index < board.length; index += 1) {
    if (board[index] !== CellStateOption.EMPTY) continue;
    board[index] = player;
    let score = getScoreForPotentialBoard(board, nextPlayer, depth + 1);
    board[index] = CellStateOption.EMPTY;
    bestScore = targetOperation(score, bestScore);
  }
  return bestScore;
};

export const getBestMove = (initialBoard: CellStateOption[]): number => {
  const board = initialBoard.slice();
  let best = { index: -1, score: -Infinity };
  for (let index = 0; index < board.length; index += 1) {
    if (board[index] !== CellStateOption.EMPTY) continue;
    board[index] = CellStateOption.X;
    let score = getScoreForPotentialBoard(board);
    board[index] = CellStateOption.EMPTY;
    if (score > best.score) {
      best = { index, score };
    }
  }
  return best.index;
};
