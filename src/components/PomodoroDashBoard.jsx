import React from 'react';
import usePomodoro from '../hooks/usePomodoro';

export default function PomodoroDashBoard() {
  const {
    pomodoroQuery: { isLoading, data: pomodoro },
  } = usePomodoro();

  if (isLoading) return <p>로딩중...</p>;

  return (
    <div className='w-full bg-white h-16 rounded-lg flex justify-around'>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-brand text-3xl font-semibold'>0</span>
        <span className='text-gray-400'>완료할 작업</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-brand text-3xl font-semibold'>{pomodoro}</span>
        <span className='text-gray-400'>완료한 작업</span>
      </div>
    </div>
  );
}
