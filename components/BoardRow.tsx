import { BoardCell } from "./BoardCell";
import { IBoardCell } from "./BoardCell";

export interface IBoardRow {
  index: number;
  row: IBoardCell[];
  onClick?: any;
}

/**
 * Build gameboard for TipTaps. The board will consist of a 12x12 outer grid and
 * a 10x10 inner grid.
 *
 * @param props
 */
/**
 * Board row for the GameBoard. A row consists of BoardCells
 *
 * @params IBoardRow
 */
export const BoardRow = ({ row, onClick }: IBoardRow) => {
  // function handleClick(evt: IBoardCell) {
  //   onClick(evt);
  // }
  return (
    <div className="board-row flex">
      {row.map((cell) => (
        <BoardCell key={cell.id} {...cell} onClick={() => onClick(cell)} />
      ))}
    </div>
  );
};
