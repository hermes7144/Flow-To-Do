import React from 'react';
import usePomodoro from '../hooks/usePomodoro';

const POMODORO_TIME = 25;

export default function PomodoroDashBoard({ activeTodo, completedCount, thisWeek }) {
  const estimateTodo = activeTodo.reduce((acc, todo) => acc + todo.estimate * POMODORO_TIME, 0);

  const {
    pomodoroQuery: { isLoading, data: pomodoro },
  } = usePomodoro();

  if (isLoading) return <p>로딩중...</p>;
  return (
    <div className='w-full bg-white h-16 rounded-lg flex justify-around mt-3'>
      <div className='flex flex-col items-center justify-center'>
        <div>
          <span className='text-brand text-3xl font-semibold'>{estimateTodo}</span>
          <span className='text-gray-400 text-sm'>분</span>
        </div>
        <span className='text-gray-400'>예정 시간</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div>
          <span className='text-brand text-3xl font-semibold'>{activeTodo.length}</span>
        </div>
        <span className='text-gray-400'>완료할 작업</span>
      </div>
      {thisWeek && (
        <>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <span className='text-brand text-3xl font-semibold'>{pomodoro * POMODORO_TIME}</span>
              <span className='text-gray-400 text-sm'>분</span>
            </div>
            <span className='text-gray-400'>완료한 시간</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div>
              <span className='text-brand text-3xl font-semibold'>{completedCount}</span>
            </div>
            <span className='text-gray-400'>완료한 작업</span>
          </div>
        </>
      )}
    </div>
  );
}
