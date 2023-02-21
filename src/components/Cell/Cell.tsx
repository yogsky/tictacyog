import { CellStateOption } from "../../enums";
import './Cell.scss';
type CellProps = {
  status: CellStateOption,
  idx: number,
  highlight: boolean;
  onClick: Function,
};

const Cell = (props: CellProps) => {
  const { status, idx, onClick, highlight } = props;
  const targetClasses = ['cell', highlight ? 'highlight' : '', !highlight && status !== CellStateOption.EMPTY ? 'appear' : ''];
  return (
    <div
      onClick={() => onClick(idx)}
      className={targetClasses.join(' ')}
    >
      {status}
    </div>
  );
};

export default Cell;
