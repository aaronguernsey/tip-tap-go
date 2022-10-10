import React, { useState, useEffect } from "react";

function incrementLocalStorageSeconds() {
  let totalSecondsPlayed;
  if (
    (totalSecondsPlayed = Number(localStorage.getItem("totalSecondsPlayed")))
  ) {
    // Increase games played by 1 in local storage
    localStorage.setItem("totalSecondsPlayed", `${totalSecondsPlayed + 1}`);
  } else {
    // Initialize games played in local storage
    localStorage.setItem("totalSecondsPlayed", "1");
  }
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
        // Increment local storage
        incrementLocalStorageSeconds();
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
      onTimerComplete();
    }
  }, [seconds, onTimerComplete]);

  return <div className="text-4xl font-bold">{seconds}s</div>;
};
