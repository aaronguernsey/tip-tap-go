import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import {
  GameBoard,
  CountdownTimer,
  Button,
  Navbar,
  StatsModal,
  SettingsModal,
  AlertContainer,
  InfoModal,
  BoardRow,
} from "../components";
import {
  BUTTON_PLAY_AGAIN,
  META_DESCRIPTION,
  META_TITLE,
  START_TITLE,
  EASY_MODE_TITLE,
  HARD_MODE_TITLE,
  NORMAL_MODE_TITLE,
  GAME_COPIED_MESSAGE,
  SHARE_FAILURE_TEXT,
} from "../constants/content";
import { ls, stats } from "../lib";
import { DEFAULT_GAME_STATS, IGameStats } from "../lib/localStorage";
import { LONG_ALERT_TIME_MS } from "../constants/settings";
import { useAlert } from "../context/AlertContext";
import { DEMO_BLANK_BOARD, DEMO_BOARD_1 } from "../lib/gameboard";

/**
 *  @todo
 * - Update home screen to have a blank gameboard with start button in middle
 * - (advanced) Add seconds for destroying multiple blocks at once
 * - Add sharing
 * - Document code
 * - Add How to Play info modal
 * - Add settings modal
 *  - dark mode
 *  - light mode
 * - Add modes
 *  - Infection mode
 *  - Static (puzzler) mode
 * - Add stat mechanics
 *  - Shortest move
 *  - Average destroyed blocks across games
 *  - (advanced) calculate minimum moves you could of had
 *  - (advanced) add countdown to start game on board
 *  - (advanced) hard mode with reinforced blocks
 *  - (advanced) a block that takes time away you more time
 *  - (super advanced) timer TipTaps; you place it and it lingers until it explodes
 * - (advanced) Allow all settings to be toggled and saved
 * - (super advanced) Allow a user to share their custom saved mode
 * Deployment
 * - Build and deploy to cloudflare
 * - Add domain
 */
const Home: NextPage = () => {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [gameNumber, setGameNumber] = useState(1);
  const [timerKey, setTimerKey] = useState(1);

  // Stats
  const [statistics, setStatistics] = useState<IGameStats>(DEFAULT_GAME_STATS);
  const [currentTipTapStreak, setCurrentTipTapStreak] = useState<number>(0);
  const [totalBoardsCleared, setTotalBoardsCleared] = useState<number>(0);
  const [tipTapHistory, setTipTapHistory] = useState<{ [key: string]: number }>(
    {}
  );

  // Settings
  const [isGameOver, setIsGameOver] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [isSecondsNotifier, setIsSecondsNotifier] = useState(true);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDarkMode
      ? true
      : false;

    setIsHardMode(
      localStorage.getItem("gameMode")
        ? localStorage.getItem("gameMode") === "hard"
        : false
    );

    setIsEasyMode(
      localStorage.getItem("gameMode")
        ? localStorage.getItem("gameMode") === "easy"
        : false
    );

    setIsSecondsNotifier(
      localStorage.getItem("secondsNotifier")
        ? localStorage.getItem("secondsNotifier") === "true"
        : true
    );

    // Show info modal if it's the user's first time playing
    setTimeout(() => {
      setIsInfoModalOpen(
        localStorage.getItem("totalGamesPlayed")
          ? Number(localStorage.getItem("totalGamesPlayed")) < 1
          : true
      );
    }, 350);
  }, []);

  let gameMode = NORMAL_MODE_TITLE;
  if (isHardMode) {
    gameMode = HARD_MODE_TITLE;
  }
  if (isEasyMode) {
    gameMode = EASY_MODE_TITLE;
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggle() {
    setIsGameActive(!isGameActive);
  }

  let newStreak = currentTipTapStreak;

  function handleGameOver(secondsPlayed: number) {
    // Increment game number
    ls.incrementGameCount();

    setIsGameOver(true);

    // Clear Stat Storage
    sessionStorage.removeItem("currentGameStats");

    // Update streak
    newStreak += secondsPlayed;
    setCurrentTipTapStreak(newStreak);

    // Trigger Stats Modal
    handleOpenStatsModal(true);
  }

  /**
   * Retrieve the latest stats and open the stats model.
   *
   * @param open flag to open or close the stats modal
   */
  function handleOpenStatsModal(open: boolean) {
    // Generate tip tap history graph
    const heatmap = stats.generateTipTapHeatmap(
      tipTapHistory,
      totalBoardsCleared
    );

    let statStorage = sessionStorage.getItem("currentGameStats");
    let currGameStats: IGameStats;
    if (statStorage) {
      currGameStats = JSON.parse(statStorage) as IGameStats;
    } else {
      currGameStats = {
        ...ls.getGameStats(),
        heatmap: heatmap,
        currentStreak: newStreak,
        mode: gameMode,
      };
      sessionStorage.setItem("currentGameStats", JSON.stringify(currGameStats));
    }

    // Save current game session
    setStatistics(currGameStats);

    // Open modal
    setIsStatsModalOpen(open);
  }

  function onStartOver() {
    // Refresh board
    setGameNumber(gameNumber + 1);
    // Reset game over boolean
    setIsGameOver(false);
    // Restart timer
    setTimerKey(timerKey + 1);
    // Reset tip tap history
    setTipTapHistory({});
    setTotalBoardsCleared(0);
    setCurrentTipTapStreak(0);
  }

  /**
   * Store the user's game mode preference
   *
   * @param mode type of game mode
   */
  const handleGameMode = (mode: "hard" | "easy", enable: boolean) => {
    switch (mode) {
      case "hard":
        setIsHardMode(enable);
        setIsEasyMode(false);
        localStorage.setItem("gameMode", enable ? "hard" : "normal");
        break;
      case "easy":
        setIsEasyMode(enable);
        setIsHardMode(false);
        localStorage.setItem("gameMode", enable ? "easy" : "normal");
        break;
    }
  };

  /**
   * Toggle seconds notifier and store the user's preference
   * in their local storage.
   */
  const handleSecondsNotifier = (secondsNotifier: boolean) => {
    setIsSecondsNotifier(secondsNotifier);
    localStorage.setItem("secondsNotifier", `${secondsNotifier}`);
  };

  /**
   * Handle the tip tap history change
   */
  const handleTipTapChange = (move: string) => {
    // Update the tip tap history with the latest move
    // Copy current history
    const currHistory = { ...tipTapHistory };
    // Get value of previous history
    const val = currHistory[move] ?? 0;
    // Increment count for an index
    currHistory[move] = val + 1;

    // Update history state
    setTipTapHistory(currHistory);
  };

  // TODO:
  // Move all time logic to parent component
  const childFunc: any = useRef();
  function handleIncrementTime(seconds: number) {
    if (seconds !== 0) {
      childFunc.current(seconds);
    }
  }

  let boardHeader = (
    <CountdownTimer
      key={timerKey}
      isActive={isGameActive}
      isSecondsNotifier={isSecondsNotifier}
      childFunc={childFunc}
      onTimerComplete={(s: number) => handleGameOver(s)}
    />
  );
  if (isGameOver) {
    boardHeader = (
      <Button classes="ms-auto" onClick={onStartOver}>
        {BUTTON_PLAY_AGAIN}
      </Button>
    );
  }

  let gameboard = (
    <div className="">
      <div className="flex justify-center items-center p-4">
        <Button onClick={toggle}>{START_TITLE}</Button>
      </div>
      <div className="board board-freeze my-3">
        {DEMO_BLANK_BOARD.map((row, i) => (
          <BoardRow key={i} row={row} index={i} />
        ))}
      </div>
    </div>
  );

  if (isGameActive) {
    gameboard = (
      <>
        <div className="flex justify-center items-center w-full p-4">
          {boardHeader}
        </div>

        <GameBoard
          key={gameNumber}
          isGameOver={isGameOver}
          isEasyMode={isEasyMode}
          isHardMode={isHardMode}
          onIncrementTime={handleIncrementTime}
          onTipTapChange={handleTipTapChange}
          onBoardChange={(b: number) => setTotalBoardsCleared(b)}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        setIsStatsModalOpen={handleOpenStatsModal}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        setIsInfoModalOpen={setIsInfoModalOpen}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        gameMode={statistics.mode}
        currentGameMode={gameMode}
        handleClose={() => setIsStatsModalOpen(false)}
        handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        handleShareFailure={() =>
          showErrorAlert(SHARE_FAILURE_TEXT, {
            durationMs: LONG_ALERT_TIME_MS,
          })
        }
        {...statistics}
      >
        {/* {isGameOver && (
          <div className="border-t-2 pt-8 pb-4">
            <Button
              onClick={() => {
                setIsStatsModalOpen(false);
                setTimeout(() => {
                  onStartOver();
                }, 500);
              }}
            >
              {BUTTON_PLAY_AGAIN}
            </Button>
          </div>
        )} */}
      </StatsModal>
      <SettingsModal
        isGameActive={isGameActive && !isGameOver}
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isEasyMode={isEasyMode}
        isHardMode={isHardMode}
        handleGameMode={handleGameMode}
        isSecondsNotifier={isSecondsNotifier}
        handleSecondsNotifier={handleSecondsNotifier}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />

      <main className="max-w-[600px] py-5 mx-auto">{gameboard}</main>
      <AlertContainer />
    </div>
  );
};

export default Home;
