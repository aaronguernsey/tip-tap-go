import { BoardCell, IBoardCell } from "./BoardCell";

export interface IBoardRow {
  index: number;
  row: IBoardCell[];
  onClick?: any;
}

/**
 * Board row for the GameBoard. A row consists of BoardCells
 *
 * @params IBoardRow
 */
export const BoardRow = ({ row, onClick }: IBoardRow) => {
  return (
    <div className="board-row flex">
      {row.map((cell) => (
        <BoardCell
          key={cell.id}
          {...cell}
          onClick={() => (onClick ? onClick(cell) : null)}
        />
      ))}
    </div>
  );
};
