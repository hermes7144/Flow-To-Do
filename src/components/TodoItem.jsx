import React from 'react';
import useTodos from '../hooks/useTodos';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaStopwatch } from 'react-icons/fa';

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodos();

  const handleDelete = deleteTodo.mutate;

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      status: todo.status === 'active' ? 'completed' : 'active',
    });
  };

  const PomodoroIconList = ({ estimate }) => {
    const icons = Array.from({ length: estimate }, (_, index) => (
      <FaStopwatch key={index} className='text-brand opacity-50' />
    ));

    return <div className='flex'>{icons}</div>;
  };

  return (
    <li className='flex justify-between items-center bg-white p-2 my-1 rounded-md'>
      <div className='flex'>
        <input
          className='mr-2'
          type='checkbox'
          onChange={() => handleUpdate(todo)}
          checked={todo.status === 'completed'}
        />
        <div className='flex flex-col'>
          <span>{todo.name}</span>
          <PomodoroIconList estimate={todo.estimate} />
        </div>
      </div>

      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300'>
        <button type='button' onClick={() => handleDelete(todo.id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </li>
  );
}
