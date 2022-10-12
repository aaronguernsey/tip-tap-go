import React, { useState, useEffect } from "react";
import { DEFAULT_START_TIME } from "../constants/settings";
import { ls } from "../lib";

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
  const [seconds, setSeconds] = useState(DEFAULT_START_TIME);
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
      ls.storeLongestStreak(totalSecondsPlayed);
      // Increment local storage
      ls.incrementTotalSecondsPlayed(totalSecondsPlayed);
      onTimerComplete();
    }
  }, [seconds, onTimerComplete, totalSecondsPlayed]);

  return <div className="text-4xl font-bold">{seconds}s</div>;
};
