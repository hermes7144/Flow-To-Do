import React from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';

export default function Home() {
  return (
    <div className='p-5  relative h-dvh'>
      <TodoList />
      <Pomodoro />
    </div>
  );
}
