import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
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
  START_TITLE,
} from "../constants/content";
import { ls } from "../lib";

/**
 *  @todo
 * - dark mode
 * - light mode
 * - Refactor:
 *  - separate components out
 *  - Add functions to a utils folder
 * - Build and deploy to cloudflare
 * - Add dialog for stats
 * - Make variables dynamic (timer seconds, grid squares, etc.)
 * - Add stat mechanics
 *  - Shortest move
 *  - Average destroyed blocks across games
 *  - (advanced) calculate minimum moves you could of had
 *  - (advanced) add countdown to start game on board
 *  - (advanced) hard mode with reinforced blocks
 *  - (advanced) a block that takes time away you more time
 *  - (super advanced) timer TipTaps; you place it and it lingers until it explodes
 * - cat mode
 */
const Home: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameNumber, setGameNumber] = useState(1);
  const [timerKey, setTimerKey] = useState(1);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [stats, setStats] = useState({});

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggle() {
    setIsActive(!isActive);
  }

  function handleGameOver() {
    // Increment game number
    ls.incrementGameCount();

    setIsGameOver(true);

    // Trigger Stats Modal
    handleOpenStatsModal(true);
  }

  function handleOpenStatsModal(open: boolean) {
    const totalGamesPlayed =
      Number(localStorage.getItem("totalGamesPlayed")) ?? 0;
    const longestStreak = Number(localStorage.getItem("longestStreak")) ?? 0;

    const totalBlocksDestroyed =
      Number(sessionStorage.getItem("totalBlocksDestroyed")) ?? 0;
    const totalTipTapsUsed =
      Number(sessionStorage.getItem("totalTipTapsUsed")) ?? 0;

    setStats(
      (s) =>
        (s = {
          totalGamesPlayed,
          longestStreak,
          totalBlocksDestroyed,
          totalTipTapsUsed,
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
  }

  // TODO:
  // Move all time logic to parent component
  const childFunc: any = useRef();
  function handleIncrementTime(seconds: number) {
    childFunc.current(seconds);
  }

  let boardHeader = (
    <CountdownTimer
      key={timerKey}
      isActive={isActive}
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

  if (isActive) {
    gameboard = (
      <>
        <div className="flex justify-center items-center w-full p-4">
          {boardHeader}
        </div>

        <GameBoard
          key={gameNumber}
          isGameOver={isGameOver}
          onIncrementTime={handleIncrementTime}
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

      <Navbar setIsStatsModalOpen={handleOpenStatsModal} />
      <StatsModal
        isOpen={isStatsModalOpen}
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

      <main className="max-w-[600px] py-2 mx-auto">{gameboard}</main>
    </div>
  );
};

export default Home;
