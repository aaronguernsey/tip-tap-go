import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  GameBoard,
  CountdownTimer,
  Button,
  Navbar,
  StatsModal,
} from "../components";
import {
  BUTTON_PLAY_AGAIN,
  META_DESCRIPTION,
  META_TITLE,
} from "../constants/content";

/**
 *  @todo
 * - add styles, use Tailwind
 * - dark mode
 * - light mode
 * - Refactor:
 *  - separate components out
 *  - Add functions to a utils folder
 *  - (advanced) Add use context for shared stats?
 * - Build and deploy to cloudflare
 * - Add dialog for stats
 * - Make variables dynamic (timer seconds, grid squares, etc.)
 * - Add stat mechanics
 *  - Shortest move
 *  - Longest round time
 *  - Average destroyed blocks across games
 *  - Best round
 *  - Worst round
 *  - (advanced) calculate minimum moves you could of had
 *  - (advanced) add countdown to start game on board
 *  - (advanced) hard mode with reinforced blocks
 *  - (advanced) a block that gives you more time
 *  - (super advanced) timer radii; you place it and it lingers until it explodes
 * - cat mode
 * - Move to base React app, this doens't need SSR
 */
const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameNumber, setGameNumber] = useState(1);
  const [timerKey, setTimerKey] = useState(1);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [startTime, setStartTime] = useState(10);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDarkMode
      ? true
      : false;
  }, []);

  function incrementGameCount() {
    let totalGamesPlayed;
    if ((totalGamesPlayed = Number(localStorage.getItem("totalGamesPlayed")))) {
      // Increase games played by 1 in local storage
      localStorage.setItem("totalGamesPlayed", `${totalGamesPlayed + 1}`);
    } else {
      // Initialize games played in local storage
      localStorage.setItem("totalGamesPlayed", "1");
    }
  }

  function toggle() {
    setIsActive(!isActive);
    incrementGameCount();
  }

  function handleGameOver() {
    setIsGameOver(true);

    // Trigger Stats Modal
    handleOpenStatsModal(true);
  }

  function handleOpenStatsModal(open: boolean) {
    let totalGamesPlayed =
      Number(localStorage.getItem("totalGamesPlayed")) ?? 0;
    let totalSecondsPlayed =
      Number(localStorage.getItem("totalSecondsPlayed")) ?? 0;

    // todo: reset these when refresh or session ends (not local storage)
    let totalBlocksDestroyed =
      Number(localStorage.getItem("totalBlocksDestroyed")) ?? 0;
    let totalRadiiUsed = Number(localStorage.getItem("totalRadiiUsed")) ?? 0;

    setStats(
      (s) =>
        (s = {
          totalGamesPlayed,
          totalSecondsPlayed,
          totalBlocksDestroyed,
          totalRadiiUsed,
        })
    );

    setIsStatsModalOpen(open);
  }

  function onStartOver() {
    // Refresh board
    setGameNumber(gameNumber + 1);
    // Reset game over boolean
    setIsGameOver(false);
    // Restart timer
    setTimerKey(timerKey + 1);
    // Increment game number
    incrementGameCount();
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const childFunc: any = useRef();
  function handleIncrementTime(seconds: number) {
    childFunc.current(seconds);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar setIsStatsModalOpen={handleOpenStatsModal} />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        {...stats}
      >
        {isGameOver && (
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
        )}
      </StatsModal>

      <main className={styles.main}>
        {!isActive && (
          <div className="flex flex-col">
            <h1 className="text-center text-5xl font-bold mb-6">
              {META_TITLE}
            </h1>
            <Button onClick={toggle}>Start</Button>
          </div>
        )}

        {isActive && (
          <>
            <div className="flex justify-center items-center w-full p-4">
              {!isGameOver && (
                <CountdownTimer
                  key={timerKey}
                  isActive={isActive}
                  childFunc={childFunc}
                  onTimerComplete={() => handleGameOver()}
                />
              )}
              {isGameOver && (
                <Button classes="ms-auto" onClick={onStartOver}>
                  {BUTTON_PLAY_AGAIN}
                </Button>
              )}
            </div>

            <GameBoard
              key={gameNumber}
              isGameOver={isGameOver}
              onIncrementTime={handleIncrementTime}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
