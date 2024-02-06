import React from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import { getDate } from '../js/CommonFunction';
import AddTodo from '../components/AddTodo';

export default function Home() {
  const {
    productsQuery: { isLoading, error, data: todos },
  } = useTodos();

  if (isLoading) return <span>Loading...</span>;

  const activeTodo = todos.filter(
    (todo) => todo.status === 'active' && todo.deadline <= getDate()
  );

  const completedTodo = todos.filter(
    (todo) => todo.status === 'completed' && todo.completedDate === getDate()
  );

  return (
    <div
      className='p-5 relative bg-gray-100 overflow-y-auto'
      style={{ height: 'calc(100vh - 57px)' }}
    >
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
