import React from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import { getNextWeek, getThisWeek, getToday, getTomorrow } from '../js/CommonFunction';
import AddTodo from '../components/AddTodo';
import Sidebar from '../components/Sidebar';
import { useCategoryContext } from '../context/CategoryContext';

function getDeadline(category) {
  switch (category) {
    case '오늘':
      return getToday();
    case '내일':
      return getTomorrow();
    case '이번주':
      return getThisWeek();
    case '다음주':
      return getNextWeek();
    default:
      return null;
  }
}

export default function Home() {
  const {
    productsQuery: { isLoading, error, data: todos },
  } = useTodos();

  const { category } = useCategoryContext();

  if (isLoading) return <span>Loading...</span>;

  let activeTodo;
  let completedTodo;

  if (category === '내일') {
    const tomorrow = getTomorrow();
    activeTodo = todos.filter((todo) => todo.status === 'active' && todo.deadline === tomorrow);
    completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate === tomorrow);
  } else if (category === '다음주') {
    const { start: nextWeekStart, end: nextWeekEnd } = getNextWeek();
    activeTodo = todos.filter((todo) => todo.status === 'active' && todo.deadline >= nextWeekStart && todo.deadline <= nextWeekEnd);
    completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate >= nextWeekStart && todo.completedDate <= nextWeekEnd);
  } else {
    const deadline = getDeadline(category);
    activeTodo = todos.filter((todo) => todo.status === 'active' && todo.deadline <= deadline);
    completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate === getToday());
  }

  return (
    <div className='flex flex-col lg:flex-row'>
      <Sidebar />
      <div className='flex-1 p-5 relative bg-gray-100 overflow-y-auto' style={{ height: 'calc(100vh - 57px)' }}>
        {category}
        <PomodoroDashBoard activeCount={activeTodo.length} completedCount={completedTodo.length} />
        <AddTodo />
        <TodoList activeTodo={activeTodo} completedTodo={completedTodo} />
        <Pomodoro />
      </div>
    </div>
  );
}
