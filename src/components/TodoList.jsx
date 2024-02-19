import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ activeTodo, completedTodo }) {
  const hasTodos = activeTodo && activeTodo.length > 0;
  return (
    <div className='flex flex-col pb-20'>
      <span>오늘</span>
      {!hasTodos && <p>할 일 목록이 없습니다.</p>}
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
