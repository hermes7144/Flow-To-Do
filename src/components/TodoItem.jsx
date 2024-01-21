import React from 'react';
import useTodos from '../hooks/useTodos';
import { FaRegTrashCan } from 'react-icons/fa6';

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodos();

  const handleDelete = deleteTodo.mutate;

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      status: todo.status === 'active' ? 'completed' : 'active',
    });
  };

  return (
    <li className='flex justify-between items-center bg-white p-2 my-1 rounded-md'>
      <div>
        <input
          className='mr-2'
          type='checkbox'
          onChange={() => handleUpdate(todo)}
          checked={todo.status === 'completed'}
        />
        <span>{todo.name}</span>
      </div>
      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300'>
        <button type='button' onClick={() => handleDelete(todo.id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </li>
  );
}
