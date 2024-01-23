import React, { useEffect, useState } from 'react';
import {
  FaRegPauseCircle,
  FaRegPlayCircle,
  FaRegStopCircle,
} from 'react-icons/fa';

export default function Pomodoro() {
  // const POMODORO_TIME = 25 * 60;
  const POMODORO_TIME = 2;
  const REST_TIME = 5 * 60;
  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [restSeconds, setRestSeconds] = useState(REST_TIME);
  const [isRestRunning, setIsRestRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          setIsRunning(false);
          clearInterval(timer);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, seconds]);

  useEffect(() => {
    let timer;

    if (isRestRunning) {
      timer = setInterval(() => {
        if (restSeconds > 0) {
          setRestSeconds((prev) => prev - 1);
        } else {
          setIsRestRunning(false);
          clearInterval(timer);
          setSeconds(POMODORO_TIME);
        }
      }, 1000);
    } else {
      setSeconds(POMODORO_TIME);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRestRunning, restSeconds]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => setSeconds(POMODORO_TIME);

  const handleRestStart = () => setIsRestRunning(true);
  const handleRestPause = () => setIsRestRunning(false);

  return seconds > 0 ? (
    <div className='fixed -ml-10 w-32 h-14 top-auto bottom-10 left-1/2 bg-brand rounded-xl flex justify-around items-center'>
      <span className='text-lg text-white font-bold'>
        {Math.ceil(seconds / 60)}
      </span>
      {isRunning ? (
        <button onClick={handlePause}>
          <FaRegPauseCircle className='w-7 h-7 text-white' />
        </button>
      ) : (
        <button onClick={handleStart}>
          <FaRegPlayCircle className='w-7 h-7 text-white' />
        </button>
      )}
      {!isRunning && seconds !== POMODORO_TIME && (
        <button onClick={handleReset}>
          <FaRegStopCircle className='w-5 h-5 text-white' />
        </button>
      )}
    </div>
  ) : (
    <div className='fixed -ml-10 w-32 h-14 top-auto bottom-10 left-1/2 bg-slate-800 rounded-xl flex justify-around items-center'>
      <span className='text-lg text-white font-bold'>
        {Math.ceil(restSeconds / 60)}
      </span>
      {isRestRunning ? (
        <button onClick={handleRestPause}>
          <FaRegPauseCircle className='w-7 h-7 text-white' />
        </button>
      ) : (
        <button onClick={handleRestStart}>
          <FaRegPlayCircle className='w-7 h-7 text-white' />
        </button>
      )}
    </div>
  );
}
