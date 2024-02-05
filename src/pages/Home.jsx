import React, { useContext } from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import { useAuthContext } from '../context/AuthContext';
import useTodos from '../hooks/useTodos';
import { getDate } from '../js/CommonFunction';
import AddTodo from '../components/AddTodo';
import { SyncLoader } from 'react-spinners';

export default function Home() {
  const {
    productsQuery: { isLoading, error, data: todos },
  } = useTodos();

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-dvh overflow-y-hidden  overflow-x-hidden'>
        <SyncLoader color='#fe5a4a' />
      </div>
    );

  const activeTodo = todos.filter(
    (todo) => todo.status === 'active' && todo.deadline <= getDate()
  );

  const completedTodo = todos.filter(
    (todo) => todo.status === 'completed' && todo.completedDate === getDate()
  );

  return (
    <div className='p-5 relative h-dvh'>
      <>
        <PomodoroDashBoard
          activeCount={activeTodo.length}
          completedCount={completedTodo.length}
        />
        <AddTodo />
        <TodoList activeTodo={activeTodo} completedTodo={completedTodo} />
        <Pomodoro />
      </>
    </div>
  );
}
