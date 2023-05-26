import { classesBuddy } from '@/classes-buddy'
import Cell from '../Cell'
import './Board.css'
import { useTicTacToeCtx } from '../../../TicTacToeContext'

function Board (): JSX.Element {
  const { winnerPath, onCellClick, board } = useTicTacToeCtx()
  const Cells = board.map((status, idx) => (
    <Cell
      key={idx}
      idx={idx}
      highlight={winnerPath.has(idx)}
      status={status}
      onCellClick={onCellClick}
    />
  ))
  const containerClasses = classesBuddy(winnerPath.size > 0 ? 'finished' : '', 'board-container')
  return <div className={containerClasses}>{Cells}</div>
}

export default Board
