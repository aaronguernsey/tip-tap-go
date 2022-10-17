import React, { useState, useEffect, useRef } from "react";
import { CountdownSeconds, ICountdownSeconds } from ".";
import { DEFAULT_START_TIME } from "../constants/settings";
import { getRandomIntInclusive, ls } from "../lib";
import { v4 as uuidv4 } from "uuid";

export interface ICountdownProps {
  isActive: boolean;
  isSecondsNotifier: boolean;
  childFunc: any;
  onTimerComplete: Function;
}

export const CountdownTimer = ({
  isActive,
  isSecondsNotifier,
  childFunc,
  onTimerComplete,
}: ICountdownProps) => {
  const [seconds, setSeconds] = useState(DEFAULT_START_TIME);
  const [totalSecondsPlayed, setTotalSecondsPlayed] = useState(0);
  const [additionalSeconds, setAdditionalSeconds] = useState<
    ICountdownSeconds[]
  >([]);

  const cleanAdditionalSeconds = useRef((id: string) => {
    setAdditionalSeconds((currentSeconds) =>
      currentSeconds.filter((secondsItem) => secondsItem.id !== id)
    );
  });

  function addAdditionalSeconds(s: number) {
    setAdditionalSeconds((prevSeconds: ICountdownSeconds[]) => [
      ...prevSeconds,
      { id: uuidv4(), seconds: s },
    ]);
  }

  function handleIncrementTime(add: number) {
    setSeconds((s) => s + add);

    // Seconds incrementor settings enabled
    if (isSecondsNotifier) {
      addAdditionalSeconds(add);
    }
  }

  useEffect(() => {
    childFunc.current = handleIncrementTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      onTimerComplete(totalSecondsPlayed);
    }
  }, [seconds, onTimerComplete, totalSecondsPlayed]);

  return (
    <div className="countdown-timer">
      <div className="relative inline-block">
        {isSecondsNotifier &&
          additionalSeconds.map((secondsItem: ICountdownSeconds) => (
            <CountdownSeconds
              onAnimationEnd={cleanAdditionalSeconds.current}
              key={secondsItem.id}
              id={secondsItem.id}
              seconds={secondsItem.seconds}
            />
          ))}
      </div>
      <span className="text-4xl font-bold">{seconds}s</span>
    </div>
  );
};
