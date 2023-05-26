import { classesBuddy } from '@/classes-buddy'
import { CellStateOption } from '@/enums'
import './Cell.css'

interface CellProps {
  status: CellStateOption
  idx: number
  highlight: boolean
  onCellClick: (idx: number) => void
}

const playerToClass = {
  [CellStateOption.X]: 'p1',
  [CellStateOption.O]: 'p2',
  [CellStateOption.EMPTY]: 'empty'
}

function Cell (props: CellProps): JSX.Element {
  const { status, idx, onCellClick, highlight } = props
  const cellClasses = {
    highlight: () => highlight,
    filled: () => status !== CellStateOption.EMPTY
  }
  return (
    <div onClick={() => { onCellClick(idx) } } className={classesBuddy('cell', playerToClass[status], cellClasses)}>
      <span className='status'>{status}</span>
    </div>
  )
}

export default Cell
