import React from 'react';
import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';

export default function TodoList({ activeTodo, completedTodo }) {
  const hasTodos = activeTodo && activeTodo.length > 0;
  return (
    <div className='flex flex-col pb-20'>
      {!hasTodos && <EmptyTodo />}
      {activeTodo && (
        <ul className='flex-1'>
          {activeTodo.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      {completedTodo && (
        <div>
          <span>완료한 할일</span>
          <ul className='flex-1'>
            {completedTodo.map((todo) => (
              <TodoItem key={todo.id} todo={todo} completed />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
