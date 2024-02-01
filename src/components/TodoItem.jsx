import React from 'react';
import useTodos from '../hooks/useTodos';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegPlayCircle, FaStopwatch } from 'react-icons/fa';
import { getDate } from '../js/CommonFunction';
import { usePomodoroContext } from '../context/PomodoroContext';

export default function TodoItem({ todo }) {
  const { runningTodo, setRunningTodo, isRunning, startPomodoro } =
    usePomodoroContext();
  const { updateTodo, deleteTodo } = useTodos();
  const handleDelete = deleteTodo.mutate;

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      completedDate: todo.status === 'active' ? getDate() : '',
      status: todo.status === 'active' ? 'completed' : 'active',
    });
    if (todo.status === 'active') setRunningTodo(null);
  };

  const PomodoroIconList = ({ estimate, done }) => {
    const icons =
      done > 5 ? (
        <>
          <FaStopwatch className='text-brand opacity-80' />
          <span>{done}</span>
          /
          <FaStopwatch className='text-brand opacity-40' />
          <span>{estimate}</span>
        </>
      ) : estimate > done ? (
        Array.from({ length: estimate }, (_, index) => (
          <FaStopwatch
            key={index}
            className={`text-brand ${
              index + 1 <= done ? 'opacity-80' : 'opacity-40'
            } `}
          />
        ))
      ) : (
        Array.from({ length: Math.min(5, done) }, (_, index) => (
          <FaStopwatch key={index} className='text-brand opacity-80' />
        ))
      );

    return <div className='flex'>{icons}</div>;
  };

  const handleStart = (todo) => {
    startPomodoro(todo);
  };

  return (
    <li className='flex justify-between items-center bg-white p-2 my-1 rounded-md'>
      <div className='flex items-center'>
        <input
          className='mr-2'
          type='checkbox'
          onChange={() => handleUpdate(todo)}
          checked={todo.status === 'completed'}
        />
        {todo.status === 'active' && (
          <button className='mr-2' onClick={() => handleStart(todo)}>
            {isRunning && runningTodo === todo ? (
              <FaStopwatch className='w-5 h-5 text-brand opacity-80' />
            ) : (
              <FaRegPlayCircle className='w-5 h-5 text-gray-300' />
            )}
          </button>
        )}
        <div className='flex flex-col'>
          <span>{todo.name}</span>
          <PomodoroIconList estimate={todo.estimate} done={todo.done} />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span>{todo.deadline}</span>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300'>
          <button type='button' onClick={() => handleDelete(todo.id)}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </li>
  );
}