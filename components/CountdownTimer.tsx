import React, { useState, useEffect } from "react";

function incrementLocalStorageSeconds(seconds: number) {
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

function storeLongestStreak(seconds: number) {
  let longestStreak = localStorage.getItem("longestStreak");
  if (longestStreak && Number(longestStreak) > seconds) {
    // Streak is longer than current session
    return;
  }

  localStorage.setItem("longestStreak", `${seconds}`);
}

export interface ICountdownProps {
  isActive: boolean;
  childFunc: any;
  onTimerComplete: () => void;
}

export const CountdownTimer = ({
  isActive,
  childFunc,
  onTimerComplete,
}: ICountdownProps) => {
  const [seconds, setSeconds] = useState(10);
  const [totalSecondsPlayed, setTotalSecondsPlayed] = useState(0);

  useEffect(() => {
    childFunc.current = handleIncrementTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleIncrementTime(add: number) {
    setSeconds((s) => s + add);
  }

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);

        // Increment total seconds played
        setTotalSecondsPlayed((s) => s + 1);
      }, 1000);
    } else if (isActive && seconds <= 0) {
      clearInterval(interval);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds <= 0) {
      storeLongestStreak(totalSecondsPlayed);
      // Increment local storage
      incrementLocalStorageSeconds(totalSecondsPlayed);
      onTimerComplete();
    }
  }, [seconds, onTimerComplete, totalSecondsPlayed]);

  return <div className="text-4xl font-bold">{seconds}s</div>;
};
