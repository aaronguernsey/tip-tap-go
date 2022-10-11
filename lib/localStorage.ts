/**
 * Add a generic getter
 * Add a generic setter
 * Add a generic incrementer
 *
 */

export function incrementLocalStorageSeconds(seconds: number) {
  let totalSecondsPlayed;
  if (
    (totalSecondsPlayed = Number(localStorage.getItem("totalSecondsPlayed")))
  ) {
    // Increase seconds played by 1 in local storage
    console.log("total seconds: ", totalSecondsPlayed);
    console.log("add on seconds: ", seconds);
    localStorage.setItem(
      "totalSecondsPlayed",
      `${totalSecondsPlayed + seconds}`
    );
  } else {
    // Initialize seconds played in local storage
    localStorage.setItem("totalSecondsPlayed", `${seconds}`);
  }
}

export function storeLongestStreak(seconds: number) {
  let longestStreak = localStorage.getItem("longestStreak");
  if (longestStreak && Number(longestStreak) > seconds) {
    // Streak is longer than current session
    return;
  }

  localStorage.setItem("longestStreak", `${seconds}`);
}

export function incrementGameCount() {
  let totalGamesPlayed;
  if ((totalGamesPlayed = Number(localStorage.getItem("totalGamesPlayed")))) {
    // Increase games played by 1 in local storage
    localStorage.setItem("totalGamesPlayed", `${totalGamesPlayed + 1}`);
  } else {
    // Initialize games played in local storage
    localStorage.setItem("totalGamesPlayed", "1");
  }
}
