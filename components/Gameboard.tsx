import { BoardRow } from ".";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IBoardCell } from "./BoardCell";
import { BOARD_ROWS_COUNT, BOARD_CELL_COUNT } from "../constants/settings";

export interface IndexMap {
  row: number;
  cell: number;
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getNewRow(rowIndex: number) {
  const row: IBoardCell[] = [];

  for (let i = 0; i < BOARD_CELL_COUNT; i++) {
    row.push({
      id: uuidv4(),
      index: { row: rowIndex, cell: i },
      isBlock: false,
      isDestroyed: false,
      isSelected: false,
      value: 0,
    });
  }

  return row;
}

let selected: IndexMap[] = [];

function getRandomCell(): IndexMap {
  // Pick one random number between 1-BOARD_ROWS_COUNT (row range)
  const row = getRandomIntInclusive(1, BOARD_ROWS_COUNT - 2);

  // Pick one random number between 1-BOARD_CELL_COUNT (cell range)
  const cell = getRandomIntInclusive(1, BOARD_CELL_COUNT - 2);

  // Create index map
  let index: IndexMap = { row: row, cell: cell };

  const foundIndex = selected.findIndex(
    (item) => item.row == index.row && item.cell == index.cell
  );

  if (foundIndex > -1) {
    // If number has been selected, choose another
    index = getRandomCell();
  } else {
    // Add index map to selected indexes
    selected.push(index);
  }

  return index;
}

function getBoardRows() {
  const boardRows: Array<IBoardCell[]> = Array(BOARD_ROWS_COUNT)
    .fill(undefined)
    .map((_, i) => getNewRow(i));

  const indexes = [];

  // Add 5 blocks randomly inside 10x10 inner grid
  for (let i = 0; i < 5; i++) {
    const index = getRandomCell();
    indexes.push(index);

    // Add block to row and cell
    boardRows[index.row][index.cell].isBlock = true;

    // Add timer element to first block (later a random block)
    if (i == getRandomIntInclusive(0, 5)) {
      boardRows[index.row][index.cell].value = getRandomIntInclusive(0, 3);
    }
  }

  // Refresh the selected variable
  selected = [];

  return boardRows;
}

export interface IGameBoardProps {
  isGameOver: boolean;
  onIncrementTime: any;
}

/**
 * Build game board. The board will consist of a 12x12 outer grid and
 * a 10x10 inner grid.
 */
export const GameBoard = ({ isGameOver, onIncrementTime }: IGameBoardProps) => {
  const [board, setBoard] = useState<Array<IBoardCell[]>>(() => getBoardRows());
  const [destroyedBlocks, setDestroyedBlocks] = useState<number>(0);
  const [totalBlocksDestroyed, setTotalBlocksDestroyed] = useState<number>(0);
  const [totalTipTapsUsed, setTotalTipTapsUsed] = useState<number>(0);

  useEffect(() => {
    // Update session storage
    sessionStorage.setItem("totalBlocksDestroyed", `${totalBlocksDestroyed}`);
  }, [totalBlocksDestroyed]);

  useEffect(() => {
    // Update session storage
    sessionStorage.setItem("totalTipTapsUsed", `${totalTipTapsUsed}`);
  }, [totalTipTapsUsed]);

  useEffect(() => {
    if (destroyedBlocks > 4) {
      setTimeout(() => {
        setBoard(getBoardRows());
        setDestroyedBlocks(0);
      }, 200);
    }
  }, [destroyedBlocks]);

  function handleIncrementTime(cell: IBoardCell) {
    if (cell.value > 0) {
      onIncrementTime(cell.value);
    }
  }

  function handleClick(cell: IBoardCell) {
    // Increment TipTaps set
    setTotalTipTapsUsed((r) => r + 1);

    // Copy board
    const currBoard = [...board];

    // Update cell in board
    currBoard[cell.index.row][cell.index.cell].isSelected = true;

    // Calculate nearest blocks that are hit
    // Watch for click on the board
    // Get row and cell index
    // Check same row if cell has a block adjacent to it
    if (
      cell.index.cell > 1 &&
      currBoard[cell.index.row][cell.index.cell - 1].isBlock &&
      !currBoard[cell.index.row][cell.index.cell - 1].isDestroyed
    ) {
      currBoard[cell.index.row][cell.index.cell - 1].isDestroyed = true;
      setDestroyedBlocks((b) => b + 1);
      setTotalBlocksDestroyed((b) => b + 1);
      handleIncrementTime(currBoard[cell.index.row][cell.index.cell - 1]);
    }

    if (
      cell.index.cell < BOARD_CELL_COUNT - 2 &&
      currBoard[cell.index.row][cell.index.cell + 1].isBlock &&
      !currBoard[cell.index.row][cell.index.cell + 1].isDestroyed
    ) {
      currBoard[cell.index.row][cell.index.cell + 1].isDestroyed = true;
      setDestroyedBlocks((b) => b + 1);
      setTotalBlocksDestroyed((b) => b + 1);
      handleIncrementTime(currBoard[cell.index.row][cell.index.cell + 1]);
    }

    // Check the row above if the cell with the same index is a block
    if (
      cell.index.row > 1 &&
      currBoard[cell.index.row - 1][cell.index.cell].isBlock &&
      !currBoard[cell.index.row - 1][cell.index.cell].isDestroyed
    ) {
      currBoard[cell.index.row - 1][cell.index.cell].isDestroyed = true;
      setDestroyedBlocks((b) => b + 1);
      setTotalBlocksDestroyed((b) => b + 1);
      handleIncrementTime(currBoard[cell.index.row - 1][cell.index.cell]);
    }

    // Check the row below if the cell with the same index is a block
    if (
      cell.index.row < BOARD_ROWS_COUNT - 2 &&
      currBoard[cell.index.row + 1][cell.index.cell].isBlock &&
      !currBoard[cell.index.row + 1][cell.index.cell].isDestroyed
    ) {
      currBoard[cell.index.row + 1][cell.index.cell].isDestroyed = true;
      setDestroyedBlocks((b) => b + 1);
      setTotalBlocksDestroyed((b) => b + 1);
      handleIncrementTime(currBoard[cell.index.row + 1][cell.index.cell]);
    }

    // Update state
    setBoard(currBoard);
  }

  const freezeBoard = isGameOver ? "board-freeze" : null;

  return (
    <div className="board-container relative">
      <div className={`board flex flex-col ${freezeBoard}`}>
        {board.map((row, i) => (
          <BoardRow
            key={i}
            row={row}
            index={i}
            onClick={(cell: IBoardCell) => handleClick(cell)}
          />
        ))}
      </div>
    </div>
  );
};
