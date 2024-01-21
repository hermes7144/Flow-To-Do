import React from 'react';
import useTodos from '../hooks/useTodos';

export default function TodoItem({ todo }) {
  const { deleteTodo } = useTodos();

  const handleDelete = (todoId) => {
    deleteTodo.mutate({ todoId });
  };
  return (
    <div>
      {todo.name}
      <button type='button' onClick={() => handleDelete(todo.id)}>
        삭제하기
      </button>
    </div>
  );
}
