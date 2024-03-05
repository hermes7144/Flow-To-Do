import React, { useEffect, useState } from 'react';
import { FaRegPauseCircle, FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa';
import usePomodoro from '../hooks/usePomodoro';
import { usePomodoroContext } from '../context/PomodoroContext';
import useTodos from '../hooks/useTodos';

// const POMODORO_TIME = 25 * 60;
// const REST_TIME = 5 * 60;
const POMODORO_TIME = 5;
const REST_TIME = 5;
const mobileFlag = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export default function Pomodoro() {
  const { addPomodoro } = usePomodoro();
  const { runningTodo, isRunning, startPomodoro, stopPomodoro } = usePomodoroContext();
  const {
    updateTodo,
    productsQuery: { data: todos },
  } = useTodos();

  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [restSeconds, setRestSeconds] = useState(REST_TIME);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timer;

    if (mobileFlag) {
      // mobile
      setIsMobile(true);
    } else {
      // desktop
      setIsMobile(false);
    }
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          addPomodoro.mutate();

          if (runningTodo) {
            const todoToUpdate = todos.find((todo) => todo.id === runningTodo.id);
            if (todoToUpdate) {
              updateTodo.mutate({ ...todoToUpdate, done: todoToUpdate.done + 1 });
            }
          }

          stopPomodoro();
          clearInterval(timer);

          if (isMobile) {
            if ('vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]);
            }
          } else {
            const audio = new Audio('/done.mp3');
            audio.play();
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [todos, isRunning, seconds, addPomodoro, stopPomodoro, runningTodo, updateTodo, isMobile]);

  useEffect(() => {
    let timer;

    if (isRestRunning) {
      timer = setInterval(() => {
        if (restSeconds > 0) {
          setRestSeconds((prev) => prev - 1);
        } else {
          setRestSeconds(REST_TIME);
          setIsRestRunning(false);
          clearInterval(timer);
          setSeconds(POMODORO_TIME);
          const audio = new Audio('/restDone.mp3');
          audio.play();
        }
      }, 1000);
    } else {
      setRestSeconds(REST_TIME);
      setSeconds(POMODORO_TIME);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRestRunning, restSeconds, runningTodo]);
  // 여기에 tdoo 넣어야 되나>
  const handleStart = () => startPomodoro();
  const handlePause = () => stopPomodoro();
  const handleReset = () => setSeconds(POMODORO_TIME);

  const handleRestStart = () => setIsRestRunning(true);
  const handleRestPause = () => setIsRestRunning(false);

  return seconds > 0 ? (
    <div className='fixed m-2 h-16 -ml-20 bottom-5 left-1/2 bg-brand rounded-xl flex flex-col justify-center w-36 text-white gap-1 shadow-lg'>
      <div className='flex justify-around items-center'>
        <span className='text-lg font-bold'>{Math.ceil(seconds / 60)}</span>
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

      {runningTodo?.name && <p className='ml-4 w-28 truncate ...'>{runningTodo?.name}</p>}
    </div>
  ) : (
    <div className='fixed m-2 h-16 -ml-20 bottom-5 left-1/2 bg-slate-800 rounded-xl flex flex-col justify-center w-36 text-white gap-1'>
      <div className='flex justify-around items-center'>
        <span className='text-lg font-bold'>{Math.ceil(restSeconds / 60)}</span>
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
      {runningTodo?.name && <p className='ml-4 w-28 truncate ...'>{runningTodo?.name}</p>}
    </div>
  );
}
