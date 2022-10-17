import { BOARD_CELL_COUNT, BOARD_ROWS_COUNT } from "../constants/settings";

/**
 * Generate an emoji heatmap history of a users tip taps
 */
export const generateTipTapHeatmap = (
  tipTapHistory: {
    [key: string]: number;
  },
  totalTaps: number
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

    const average = value / totalTaps;

    // Create a sliding heatmap scale
    // i.e. average placement of the total number of taps
    // 25%, 50%, 80%
    if (value > 35 || average > 0.8) {
      gameBoardHistory[Number(y)][Number(x)] = "🟥"; //  "🔴";
    } else if (value > 25 || average > 0.5) {
      gameBoardHistory[Number(y)][Number(x)] = "🟧"; //  "🟠";
    } else if (value > 10 || average > 0.25) {
      gameBoardHistory[Number(y)][Number(x)] = "🟨"; //  "🟡";
    } else {
      gameBoardHistory[Number(y)][Number(x)] = "🟩"; //  "🟢";
    }
  }

  return gameBoardHistory.map((rows) => rows.join(" ")).join("\n");
};
