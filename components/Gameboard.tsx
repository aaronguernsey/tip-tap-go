import { BoardRow } from ".";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { IBoardCell } from "./BoardCell";
import {
  BOARD_ROWS_COUNT,
  BOARD_CELL_COUNT,
  DEFAULT_TIME_DECREASE,
  ALWAYS_ADD_TIME,
  DEFAULT_TIME_INCREMENT,
} from "../constants/settings";
import { getRandomIntInclusive } from "../lib";

export interface IndexMap {
  row: number;
  cell: number;
}

/**
 * Build a default row for the game board.
 */
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
      originalValue: 0,
    });
  }

  return row;
}

let selected: IndexMap[] = [];

/**
 * Pick a random cell on the game board and return
 * the index (row, cell) of the cell.
 */
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

/**
 * Build the board rows for a game board.
 */
function getBoardRows() {
  const boardRows: Array<IBoardCell[]> = Array(BOARD_ROWS_COUNT)
    .fill(undefined)
    .map((_, i) => getNewRow(i));

  const indexes = [];

  // Add 5 blocks randomly inside 10x10 inner grid
  for (let i = 0; i < 5; i++) {
    const index = getRandomCell();
    indexes.push(index);

    let block = boardRows[index.row][index.cell];

    // Add block to row and cell
    block.isBlock = true;

    // Add timer element to first block (later a random block)
    if (ALWAYS_ADD_TIME || i == getRandomIntInclusive(0, 5)) {
      block.value = block.originalValue = getRandomIntInclusive(0, 3);
    }
  }

  // Refresh the selected variable
  selected = [];

  return boardRows;
}

export interface IGameBoardProps {
  isGameOver: boolean;
  isHardMode: boolean;
  isEasyMode: boolean;
  onIncrementTime: Function;
  onTipTapChange: Function;
}

/**
 * Build game board. The board will consist of a 12x12 outer grid and
 * a 10x10 inner grid.
 */
export const GameBoard = ({
  isGameOver,
  isEasyMode,
  isHardMode,
  onIncrementTime,
  onTipTapChange,
}: IGameBoardProps) => {
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

  const handleIncrementTime = useCallback(
    (seconds: number) => {
      onIncrementTime(seconds);
    },
    [onIncrementTime]
  );

  useEffect(() => {
    if (destroyedBlocks > 4) {
      setTimeout(() => {
        setBoard(getBoardRows());
        setDestroyedBlocks(0);

        // EASY: Add seconds additional seconds when a board has been cleared
        if (isEasyMode) {
          handleIncrementTime(DEFAULT_TIME_INCREMENT);
        }
      }, 200);
    }
  }, [destroyedBlocks, handleIncrementTime, isEasyMode]);

  /**
   * When a user clicks near a block, handle the destruction
   * based on the current game mode.
   *
   * @param board The current game board
   * @param y Y index of the block
   * @param x X index of the block
   */
  function handleDestroyBlock(board: IBoardCell[][], y: number, x: number) {
    const cell = board[y][x];

    if (isHardMode) {
      if (cell.value > 0) {
        cell.value -= 1;
      }

      if (cell.value < 1) {
        board[y][x].isBlock = false;
        setDestroyedBlocks((b) => b + 1);
        setTotalBlocksDestroyed((b) => b + 1);
        handleIncrementTime(board[y][x].originalValue);
      }
    } else {
      cell.isDestroyed = true;
      setDestroyedBlocks((b) => b + 1);
      setTotalBlocksDestroyed((b) => b + 1);
      handleIncrementTime(cell.value);
    }
  }

  /**
   * When a user clicks on the game board, place
   * a tip tap, destroy a block, or notify the user
   * of their mistaken click.
   */
  function handleClick(cell: IBoardCell) {
    // Increment TipTaps set
    setTotalTipTapsUsed((r) => r + 1);

    // Copy board because we don't want to alter the current game board
    // until we set its new state
    const currBoard = [...board];

    if (cell.isBlock) {
      // Punish a mistaken click on a block
      handleIncrementTime(DEFAULT_TIME_DECREASE);
      document.documentElement.classList.add("doh");
      setTimeout(() => {
        document.documentElement.classList.remove("doh");
      }, 100);
    } else {
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
        handleDestroyBlock(currBoard, cell.index.row, cell.index.cell - 1);
      }

      if (
        cell.index.cell < BOARD_CELL_COUNT - 2 &&
        currBoard[cell.index.row][cell.index.cell + 1].isBlock &&
        !currBoard[cell.index.row][cell.index.cell + 1].isDestroyed
      ) {
        handleDestroyBlock(currBoard, cell.index.row, cell.index.cell + 1);
      }

      // Check the row above if the cell with the same index is a block
      if (
        cell.index.row > 1 &&
        currBoard[cell.index.row - 1][cell.index.cell].isBlock &&
        !currBoard[cell.index.row - 1][cell.index.cell].isDestroyed
      ) {
        handleDestroyBlock(currBoard, cell.index.row - 1, cell.index.cell);
      }

      // Check the row below if the cell with the same index is a block
      if (
        cell.index.row < BOARD_ROWS_COUNT - 2 &&
        currBoard[cell.index.row + 1][cell.index.cell].isBlock &&
        !currBoard[cell.index.row + 1][cell.index.cell].isDestroyed
      ) {
        handleDestroyBlock(currBoard, cell.index.row + 1, cell.index.cell);
      }

      // Trigger change
      onTipTapChange(`${cell.index.row},${cell.index.cell}`);
    }

    // Update state
    setBoard((b) => (b = currBoard));
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
