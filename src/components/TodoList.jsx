import React from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import useTodos from '../hooks/useTodos';

export default function TodoList() {
  const {
    productsQuery: { isLoading, error, data: todos },
  } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  const hasTodos = todos && todos.length > 0;
  return (
    <div className='flex flex-col h-full'>
      <AddTodo />
      {!hasTodos && <p>할 일 목록이 없습니다.</p>}
      {hasTodos && (
        <ul className='flex-1 overflow-y-auto '>
          {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </ul>
      )}
    </div>
  );
}
