import React, { useEffect, useState } from 'react';
import {
  FaRegPauseCircle,
  FaRegPlayCircle,
  FaRegStopCircle,
} from 'react-icons/fa';
import usePomodoro from '../hooks/usePomodoro';
import { usePomodoroContext } from '../context/PomodoroContext';
import useTodos from '../hooks/useTodos';

export default function Pomodoro() {
  const { addPomodoro } = usePomodoro();
  const { runningTodo, isRunning, startPomodoro, stopPomodoro } =
    usePomodoroContext();
  const { updateTodo } = useTodos();

  const POMODORO_TIME = 25 * 60;
  const REST_TIME = 5 * 60;
  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [restSeconds, setRestSeconds] = useState(REST_TIME);
  const [isRestRunning, setIsRestRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          addPomodoro.mutate();
          runningTodo &&
            updateTodo.mutate({ ...runningTodo, done: runningTodo.done + 1 });
          stopPomodoro();
          clearInterval(timer);
          setRestSeconds(REST_TIME);
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
  }, [isRestRunning, restSeconds, runningTodo]);

  const handleStart = () => startPomodoro();
  const handlePause = () => stopPomodoro();
  const handleReset = () => setSeconds(POMODORO_TIME);

  const handleRestStart = () => setIsRestRunning(true);
  const handleRestPause = () => setIsRestRunning(false);

  return seconds > 0 ? (
    <div className='fixed p-3  h-14 top-auto -ml-36 sm:-ml-20 bottom-10 left-1/2 bg-brand rounded-xl flex justify-around items-center min-w-28 text-white'>
      <span className='text-lg font-bold'>{Math.ceil(seconds / 60)}</span>
      {runningTodo?.name && (
        <span className='mx-5 w-40 truncate ...'>{runningTodo?.name}</span>
      )}
      {isRunning ? (
        <button onClick={handlePause}>
          <FaRegPauseCircle className='w-7 h-7 font-semibold' />
        </button>
      ) : (
        <button onClick={handleStart}>
          <FaRegPlayCircle className='w-7 h-7 font-semibold' />
        </button>
      )}
      {!isRunning && seconds !== POMODORO_TIME && (
        <button onClick={handleReset}>
          <FaRegStopCircle className='w-5 h-5' />
        </button>
      )}
    </div>
  ) : (
    <div className='fixed p-3 -ml-36 sm:-ml-20 h-14 top-auto bottom-10 left-1/2 bg-slate-800 rounded-xl flex justify-around items-center min-w-28 text-white'>
      <span className='text-lg font-bold'>{Math.ceil(restSeconds / 60)}</span>
      {runningTodo?.name && (
        <span className='mx-5 w-40 truncate ...'>{runningTodo?.name}</span>
      )}
      {isRestRunning ? (
        <button onClick={handleRestPause}>
          <FaRegPauseCircle className='w-7 h-7' />
        </button>
      ) : (
        <button onClick={handleRestStart}>
          <FaRegPlayCircle className='w-7 h-7' />
        </button>
      )}
    </div>
  );
}
