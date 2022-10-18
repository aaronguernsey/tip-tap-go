/**
 * Increment the total seconds played for the user and
 * store it in the user's device's storage.
 *
 * The total seconds played is a sum of all the rounds
 * a user has played.
 *
 * @param seconds - Number of seconds played in a round
 */
export function incrementTotalSecondsPlayed(seconds: number) {
  let totalSecondsPlayed;
  if (
    (totalSecondsPlayed = Number(localStorage.getItem("totalSecondsPlayed")))
  ) {
    // Increase seconds played by 1 in local storage
    localStorage.setItem(
      "totalSecondsPlayed",
      `${totalSecondsPlayed + seconds}`
    );
  } else {
    // Initialize seconds played in local storage
    localStorage.setItem("totalSecondsPlayed", `${seconds}`);
  }
}

/**
 * Store the longest game streak in the user's device's storage.
 */
export function storeLongestStreak(seconds: number) {
  const mode = localStorage.getItem("gameMode") ?? "normal";
  let longestStreak = localStorage.getItem(`${mode}LongestStreak`);
  if (longestStreak && Number(longestStreak) > seconds) {
    // Streak is longer than current session
    return;
  }

  localStorage.setItem(`${mode}LongestStreak`, `${seconds}`);
}

/**
 * Increase the total game count by one for the current game mode.
 * If the total game count does not exist, it will be set to "1"
 * in the user's device's storage.
 */
export function incrementGameCount() {
  const mode = localStorage.getItem("gameMode") ?? "normal";
  let totalGamesPlayed;
  if (
    (totalGamesPlayed = Number(localStorage.getItem(`${mode}TotalGamesPlayed`)))
  ) {
    // Increase games played by 1 in local storage
    localStorage.setItem(`${mode}TotalGamesPlayed`, `${totalGamesPlayed + 1}`);
  } else {
    // Initialize games played in local storage
    localStorage.setItem(`${mode}TotalGamesPlayed`, "1");
  }
}

export interface IGameStats {
  totalGamesPlayed: number;
  longestStreak: number;
  totalBlocksDestroyed: number;
  totalTipTapsUsed: number;
  heatmap?: string;
  currentStreak?: number;
  mode: string;
}

export const DEFAULT_GAME_STATS = {
  totalBlocksDestroyed: 0,
  totalGamesPlayed: 0,
  totalTipTapsUsed: 0,
  longestStreak: 0,
  currentStreak: 0,
  mode: "Normal",
};

/**
 * Retrieve the user's game stats from the device storage.
 *
 * @returns { IGameStats }
 */
export function getGameStats(): IGameStats {
  const mode = localStorage.getItem("gameMode") ?? "normal";
  const totalGamesPlayed =
    Number(localStorage.getItem(`${mode}TotalGamesPlayed`)) ?? 0;
  const longestStreak =
    Number(localStorage.getItem(`${mode}LongestStreak`)) ?? 0;

  const totalBlocksDestroyed =
    Number(sessionStorage.getItem("totalBlocksDestroyed")) ?? 0;
  const totalTipTapsUsed =
    Number(sessionStorage.getItem("totalTipTapsUsed")) ?? 0;

  return {
    totalGamesPlayed,
    longestStreak,
    totalBlocksDestroyed,
    totalTipTapsUsed,
    mode,
  };
}
