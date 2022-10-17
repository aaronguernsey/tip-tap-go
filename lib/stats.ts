import { BOARD_CELL_COUNT, BOARD_ROWS_COUNT } from "../constants/settings";

/**
 * Generate an emoji heatmap history of a users tip taps
 */
export const generateTipTapHeatmap = (
  tipTapHistory: {
    [key: string]: number;
  },
  boardsCleared: number
) => {
  // Fill a default, empty board history Array
  const historyRowCells = Array(BOARD_CELL_COUNT).fill("⬜");
  const gameBoardHistory: string[][] = Array(BOARD_ROWS_COUNT)
    .fill("⬜")
    .map(() => [...historyRowCells]);

  for (const [key, value] of Object.entries(tipTapHistory)) {
    const [y, x] = key.split(",");
    if (value == 0) {
      continue;
    }

    // Take into consideration number of games played
    const average = (value / boardsCleared) * 100;

    // Create a sliding heatmap scale
    // i.e. average placement of the total number of taps
    // 25%, 50%, 80%
    if (average > 75) {
      gameBoardHistory[Number(y)][Number(x)] = "🟥"; //  "🔴";
    } else if (average > 50) {
      gameBoardHistory[Number(y)][Number(x)] = "🟧"; //  "🟠";
    } else if (average > 35) {
      gameBoardHistory[Number(y)][Number(x)] = "🟨"; //  "🟡";
    } else {
      gameBoardHistory[Number(y)][Number(x)] = "🟩"; //  "🟢";
    }
  }

  return gameBoardHistory.map((rows) => rows.join(" ")).join("\n");
};
