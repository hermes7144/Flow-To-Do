import React, { useCallback, useEffect, useState } from 'react';
import { FaRegPauseCircle, FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa';
import usePomodoro from '../hooks/usePomodoro';
import { usePomodoroContext } from '../context/PomodoroContext';
import useTodos from '../hooks/useTodos';

const POMODORO_TIME = 25 * 60;
const REST_TIME = 5 * 60;
// const POMODORO_TIME = 5;
// const REST_TIME = 5;

function pomodoroEndAction() {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  } else {
    const audio = new Audio('/done.mp3');
    audio.play();
  }
}

export default function Pomodoro() {
  const { addPomodoro } = usePomodoro();
  const { runningTodo, isRunning, setIsRunning } = usePomodoroContext();
  const {
    updateTodo,
    productsQuery: { data: todos },
  } = useTodos();

  const [seconds, setSeconds] = useState(POMODORO_TIME);
  const [restSeconds, setRestSeconds] = useState(REST_TIME);
  const [isRestRunning, setIsRestRunning] = useState(false);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(true); // Pomodoro 실행 여부를 추적하는 변수

  const handlePomodoroEnd = useCallback(
    (timer) => {
      setIsPomodoroRunning(false);
      addPomodoro.mutate();

      if (runningTodo) {
        const todoToUpdate = todos.find((todo) => todo.id === runningTodo.id);
        if (todoToUpdate) {
          updateTodo.mutate({ ...todoToUpdate, done: todoToUpdate.done + 1 });
        }
      }

      clearInterval(timer);
      setIsRunning(false);

      pomodoroEndAction();
    },
    [todos, runningTodo, addPomodoro, updateTodo, setIsRunning]
  );

  const handleRestEnd = (timer) => {
    clearInterval(timer);

    setIsRestRunning(false);
    setIsPomodoroRunning(true);
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      setIsPomodoroRunning(true);

      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            handlePomodoroEnd(timer);
            return POMODORO_TIME;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, handlePomodoroEnd]);

  useEffect(() => {
    let timer;

    if (isRestRunning) {
      timer = setInterval(() => {
        setRestSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            const audio = new Audio('/restDone.mp3');
            audio.play();

            handleRestEnd();
            return REST_TIME;
          }
        });
      }, 1000);
    } else {
      handleRestEnd();
      setRestSeconds(REST_TIME);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRestRunning]);

  const handleReset = () => setSeconds(POMODORO_TIME);

  return (
    <div className={`fixed m-2 h-16 -ml-20 bottom-5 left-1/2 rounded-xl flex flex-col justify-center w-36 text-white gap-1 shadow-lg ${isPomodoroRunning ? 'bg-brand' : 'bg-slate-800'}`}>
      <div className='flex justify-around items-center'>
        <span className='text-lg font-bold'>{Math.ceil((isPomodoroRunning ? seconds : restSeconds) / 60)}</span>
        {isPomodoroRunning && (
          <>
            <button onClick={() => setIsRunning((prevState) => !prevState)}>{isRunning ? <FaRegPauseCircle className='w-7 h-7 font-semibold' /> : <FaRegPlayCircle className='w-7 h-7 font-semibold' />}</button>
            {!isRunning && seconds !== POMODORO_TIME && (
              <button onClick={handleReset}>
                <FaRegStopCircle className='w-5 h-5 font-semibold' />
              </button>
            )}
          </>
        )}

        {!isPomodoroRunning && <button onClick={() => setIsRestRunning((prevState) => !prevState)}>{isRestRunning ? <FaRegPauseCircle className='w-7 h-7' /> : <FaRegPlayCircle className='w-7 h-7' />}</button>}
      </div>

      {runningTodo?.name && <p className='ml-4 w-28 truncate ...'>{runningTodo?.name}</p>}
    </div>
  );
}
