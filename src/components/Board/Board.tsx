import { CellStateOption } from '../../enums';
import Cell from '../Cell';
import './Board.scss';

type BoardProps = {
  winnerPath: Set<number>,
  board: CellStateOption[],
  onCellClick: Function;
};
function Board(props: BoardProps) {
  const { winnerPath, onCellClick, board } = props;
  const Cells = board.map((status, idx) =>
    <Cell
      key={idx.toString()}
      idx={idx}
      highlight={winnerPath.has(idx)}
      status={status}
      onClick={onCellClick}
    />
  );
  return (
    <div className='board-container'>
      {Cells}
    </div>
  );
}

export default Board;
