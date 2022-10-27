import { v4 as uuidv4 } from "uuid";
import { IBoardCell, IndexMap } from "../components";
import { BOARD_CELL_COUNT } from "../constants/settings";

/**
 * Build a default row for the game board.
 */
export function getNewRow(rowIndex: number, cells: number = 0) {
  const row: IBoardCell[] = [];
  const cellCount = cells > 0 ? cells : BOARD_CELL_COUNT;

  for (let i = 0; i < cellCount; i++) {
    row.push({
      id: uuidv4(),
      index: { row: rowIndex, cell: i },
      isBlock: false,
      isDestroyed: false,
      isSelected: false,
      value: 0,
      originalValue: 0,
    });
  }

  return row;
}

export function getBoardCell({
  id = uuidv4(),
  value = 0,
  originalValue = 0,
  isSelected = false,
  isBlock = true,
  isDestroyed = false,
  index = { row: 1, cell: 1 },
} = {}) {
  return {
    id,
    value,
    originalValue,
    isSelected,
    isBlock,
    isDestroyed,
    index,
  };
}

export function getDemoBoard(
  blocks: IBoardCell[] = [getBoardCell()],
  tiptaps: IndexMap[] = [{ row: 0, cell: 1 }]
): IBoardCell[][] {
  const demoBoard = Array(3)
    .fill(undefined)
    .map((_, i) => getNewRow(i, 3));

  // Add block to center of board
  for (let block of blocks) {
    demoBoard[block.index.row][block.index.cell].isBlock = block.isBlock;
    demoBoard[block.index.row][block.index.cell].isDestroyed =
      block.isDestroyed;
  }

  // Add tip tap to adjacent square
  for (let tiptap of tiptaps) {
    demoBoard[tiptap.row][tiptap.cell].isSelected = true;
  }

  return demoBoard;
}

export const DEMO_BOARD_1: Array<IBoardCell[]> = getDemoBoard([
  getBoardCell({ isDestroyed: true }),
]);
export const DEMO_BOARD_2: Array<IBoardCell[]> = getDemoBoard(
  [
    getBoardCell({ isDestroyed: true }),
    getBoardCell({ isDestroyed: true, index: { row: 0, cell: 2 } }),
    getBoardCell({ isDestroyed: true, index: { row: 2, cell: 2 } }),
  ],
  [
    {
      row: 1,
      cell: 2,
    },
  ]
);
export const DEMO_BOARD_3: Array<IBoardCell[]> = getDemoBoard(undefined, [
  {
    row: 2,
    cell: 0,
  },
  {
    row: 0,
    cell: 2,
  },
]);
