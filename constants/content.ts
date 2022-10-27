export const GAME_TITLE = "Tip Tap Go";

// SEO Meta CONTENT
export const META_TITLE = `Let's Play ${GAME_TITLE}`;
export const META_DESCRIPTION_SIMPLE =
  "Clear as many blocks before the time runs out!";
export const META_DESCRIPTION = `${META_DESCRIPTION_SIMPLE} Share your streaks with friends and family.`;

export const START_TITLE = "Let's Play";
export const HEATMAP_TITLE = "Tip Tap Heatmap";
export const DISABLED_SETTINGS_MESSAGE =
  "Settings can only be updated at the start of a game. Hurry, you're losing time!";
export const GAME_COPIED_MESSAGE = "Streak copied to clipboard";
export const SHARE_FAILURE_TEXT =
  "Unable to share the results. This feature is not supported in all browsers.";

// Mode content
export const EASY_MODE_TITLE = "Beginner";
export const NORMAL_MODE_TITLE = "Normal";
export const HARD_MODE_TITLE = "Hard";
export const HARD_MODE_ALERT_MESSAGE =
  "Hard Mode can only be enabled at the start!";

// Miscellaneous Settings Content
export const MISCELLANEOUS_SETTINGS_TITLE = "Miscellaneous";
export const MODE_SETTINGS_TITLE = "Mode";
export const SECONDS_NOTIFIER_LABEL = "Seconds Notifier";
export const GAMEBOARD_STYLE_LABEL = "Modern Board Style";

// Button Content
export const BUTTON_PLAY_AGAIN = "Play again";
export const SHARE_TEXT = "Share Streak";

export const GAME_RULES = [
  // "Tap the blank squares to clear the gray blocks",
  "In order to clear a block, you must tap a blank square adjacent to a block",
  "Clearing all blocks will generate a new board of randomly placed blocks",
  "Some blocks have time modifiers (1s, 2s, 3s). For every cleared block with a modifier, your time will increase in seconds equal to the modifier",
  "Tapping a block will decrease your time by 1 second",
];
