import { BoardCell } from "./BoardCell";
import { Cell } from "./BoardCell";

type Props = {
  index: number;
  row: Cell[];
  onClick?: any;
};

/**
 * Build gameboard for Radii. The board will consist of a 12x12 outer grid and
 * a 10x10 inner grid.
 *
 * @param props
 */
export const BoardRow = ({ row, onClick }: Props) => {
  function handleClick(evt: Cell) {
    onClick(evt);
  }
  return (
    <div className="board-row flex">
      {row.map((cell) => (
        <BoardCell key={cell.id} {...cell} onClick={() => handleClick(cell)} />
      ))}
    </div>
  );
};
