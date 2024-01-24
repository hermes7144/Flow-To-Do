import React, { useContext } from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import { useAuthContext } from '../context/AuthContext';

export default function Home() {
  const { uid } = useAuthContext();

  return (
    <div className='p-5  relative h-dvh'>
      {uid && (
        <>
          <PomodoroDashBoard />
          <TodoList />
          <Pomodoro />
        </>
      )}
    </div>
  );
}
