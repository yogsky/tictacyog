import { CellStateOption } from '../enums'

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const getInitialBoard = (): CellStateOption[] =>
  Array(9)
    .fill(1)
    .map(() => CellStateOption.EMPTY)

export function setBoardCell (board: CellStateOption[], idx: number, player: CellStateOption) {
  board[idx] = player
  return board
}

export function getWinnerPath (board: CellStateOption[]): number[] | [] {
  return (
    (WIN_COMBOS.find((combo) => {
      const [a, b, c] = combo
      return board[a] !== CellStateOption.EMPTY && board[a] === board[b] && board[a] === board[c]
    })) ?? []
  )
}

function checkWinOrBlock (board: CellStateOption[], target: CellStateOption) {
  // Winning combinations
  for (let i = 0; i < WIN_COMBOS.length; i++) {
    const [a, b, c] = WIN_COMBOS[i]
    if (board[a] === target && board[b] === target && board[c] === '') return c
    if (board[a] === target && board[c] === target && board[b] === '') return b
    if (board[b] === target && board[c] === target && board[a] === '') return a
  }
  return null
}
export function getBestAIMove (board: CellStateOption[]) {
  // Check for a win or block

  // Check for win
  let move = checkWinOrBlock(board, CellStateOption.O)
  if (move !== null) return move

  // Check for block
  move = checkWinOrBlock(board, CellStateOption.X)
  if (move !== null) return move

  // Take center
  if (board[4] === '') return 4

  // Take opposite corner
  const corners = [
    [0, 8],
    [2, 6]
  ]
  for (const [corner, opposite] of corners) {
    if (board[corner] === 'X' && board[opposite] === '') return opposite
  }

  // Take empty corner
  const cornerIndices = [0, 2, 6, 8]
  for (const i of cornerIndices) {
    if (board[i] === '') return i
  }

  // Take empty side
  const sideIndices = [1, 3, 5, 7]
  for (const i of sideIndices) {
    if (board[i] === '') return i
  }

  // No move found
  return -1
}
