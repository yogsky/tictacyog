import { useState } from 'react'
import { CellStateOption } from '../enums'
import { getBestAIMove, getInitialBoard, getWinnerPath, setBoardCell } from './utils'

const MAX_LOADING_MS = 3000
const MIN_LOADING_MS = 1500

export interface TicTacToeHook {
  board: CellStateOption[]
  isThinking: boolean
  isGameOver: boolean
  winnerPath: Set<number>
  onCellClick: (clickedCellIdx: number) => void
  resetGameClicked: () => void
}

export function useTicTacToe (): TicTacToeHook {
  const [board, setBoard] = useState(getInitialBoard())
  const [winnerPath, setWinnerPath] = useState<Set<number>>(new Set())
  const [isThinking, setIsThinking] = useState(false)

  function onCellClick (clickedCellIdx: number) {
    if (isThinking || winnerPath.size > 0 || board[clickedCellIdx] !== CellStateOption.EMPTY) return
    const boardAfterUserClick = setBoardCell([...board], clickedCellIdx, CellStateOption.X)
    setBoard(boardAfterUserClick)
    setIsThinking(true)
    const randomLoadTime = Math.max(MIN_LOADING_MS, Math.random() * MAX_LOADING_MS)
    setTimeout(() => {
      const boardAfterAIClick = setBoardCell(
        boardAfterUserClick,
        getBestAIMove(boardAfterUserClick),
        CellStateOption.O
      )
      setBoard(boardAfterAIClick)
      setWinnerPath(new Set(getWinnerPath(boardAfterAIClick)))
      setIsThinking(false)
    }, randomLoadTime)
  }

  function resetGameClicked () {
    setBoard(getInitialBoard())
    setWinnerPath(new Set())
    setIsThinking(false)
  }

  const isGameOver = winnerPath.size > 0 || !board.includes(CellStateOption.EMPTY)

  return {
    board,
    isThinking,
    isGameOver,
    winnerPath,
    onCellClick,
    resetGameClicked
  }
}
