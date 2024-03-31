import React from 'react';
import TodoList from './../components/TodoList';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import AddTodo from '../components/AddTodo';
import { getDeadline, getDate } from '../js/CommonFunction';

function isDeadlineInRange(deadline, start, end) {
  return deadline >= start && deadline <= end;
}

function filterActiveTodos(category, todos) {
  const deadline = getDeadline(category, true);
  if (!deadline) return [];

  return todos.filter((todo) => todo.status === 'active' && (category === '내일' ? todo.deadline === deadline : category === '다음 주' ? isDeadlineInRange(todo.deadline, deadline.start, deadline.end) : todo.deadline <= deadline));
}

export default function Todo({ category }) {
  const {
    productsQuery: { data: todos },
  } = useTodos();

  const activeTodo = filterActiveTodos(category, todos);
  const completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate === getDate());

  return (
    <>
      <PomodoroDashBoard activeTodo={activeTodo} completedCount={completedTodo.length} thisWeek={['오늘', '이번 주'].includes(category)} />
      <AddTodo category={category} />
      <TodoList activeTodo={activeTodo} completedTodo={completedTodo} category={category} />
    </>
  );
}
