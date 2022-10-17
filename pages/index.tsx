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
} from "../components";
import {
  BUTTON_PLAY_AGAIN,
  META_DESCRIPTION,
  META_TITLE,
  START_TITLE,
  EASY_MODE_TITLE,
  HARD_MODE_TITLE,
  NORMAL_MODE_TITLE,
} from "../constants/content";
import { ls } from "../lib";
import { DEFAULT_GAME_STATS, IGameStats } from "../lib/localStorage";

/**
 *  @todo
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [gameNumber, setGameNumber] = useState(1);
  const [timerKey, setTimerKey] = useState(1);
  const [stats, setStats] = useState<IGameStats>(DEFAULT_GAME_STATS);

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
  }, []);

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

  function handleGameOver() {
    // Increment game number
    ls.incrementGameCount();

    setIsGameOver(true);

    // Trigger Stats Modal
    handleOpenStatsModal(true);
  }

  function handleOpenStatsModal(open: boolean) {
    // get stats
    const stats = ls.getGameStats();

    setStats((s) => (s = stats));

    setIsStatsModalOpen(open);
  }

  function onStartOver() {
    // Refresh board
    setGameNumber(gameNumber + 1);
    // Reset game over boolean
    setIsGameOver(false);
    // Restart timer
    setTimerKey(timerKey + 1);
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
        console.log("isHardMode > ", isHardMode);
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
      onTimerComplete={() => handleGameOver()}
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
    <div className="flex flex-col">
      <h1 className="text-center text-5xl font-bold mb-6">{START_TITLE}</h1>
      <Button onClick={toggle}>Start</Button>
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
        />
      </>
    );
  }

  let gameMode = NORMAL_MODE_TITLE;
  if (isHardMode) {
    gameMode = HARD_MODE_TITLE;
  }
  if (isEasyMode) {
    gameMode = EASY_MODE_TITLE;
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
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        gameMode={gameMode}
        handleClose={() => setIsStatsModalOpen(false)}
        {...stats}
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

      <main className="max-w-[600px] py-5 mx-auto">{gameboard}</main>
    </div>
  );
};

export default Home;
