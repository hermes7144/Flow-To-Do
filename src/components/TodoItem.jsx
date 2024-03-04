import React, { useEffect, useRef, useState } from 'react';
import useTodos from '../hooks/useTodos';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegPlayCircle, FaStopwatch } from 'react-icons/fa';
import { getToday } from '../js/CommonFunction';
import { usePomodoroContext } from '../context/PomodoroContext';
import TodoDate from './TodoDate';

export default function TodoItem({ todo, completed }) {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState(todo.name);
  const inputRef = useRef(null);

  const { runningTodo, setRunningTodo, isRunning, startPomodoro } = usePomodoroContext();
  const { updateTodo, deleteTodo } = useTodos();
  const handleDelete = deleteTodo.mutate;

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      completedDate: todo.status === 'active' ? getToday() : '',
      status: todo.status === 'active' ? 'completed' : 'active',
    });

    if (todo.status === 'active' && runningTodo === todo) setRunningTodo(null);
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
        Array.from({ length: estimate }, (_, index) => <FaStopwatch key={index} className={`text-brand ${index + 1 <= done ? 'opacity-80' : 'opacity-40'} `} />)
      ) : (
        Array.from({ length: Math.min(5, done) }, (_, index) => <FaStopwatch key={index} className='text-brand opacity-80' />)
      );

    return <div className='flex'>{icons}</div>;
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleStart = (todo) => {
    startPomodoro(todo);
  };

  const handleClick = () => {
    setIsActive(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setIsActive(false);

    updateTodo.mutate({
      ...todo,
      name,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsActive(false);
      updateTodo.mutate({
        ...todo,
        name,
      });
    }
  };

  return (
    <li className='flex justify-between items-center bg-white p-2 my-1 rounded-md'>
      <div className='flex items-center'>
        <input className='mr-2' type='checkbox' onChange={() => handleUpdate(todo)} checked={todo.status === 'completed'} />
        <button className={`mr-2 text-brand ${completed ? 'opacity-50' : 'opacity-80'}`} onClick={() => handleStart(todo)} disabled={completed}>
          {isRunning && runningTodo === todo ? <FaStopwatch className='w-5 h-5' /> : <FaRegPlayCircle className='w-5 h-5' />}
        </button>
        <div className='flex flex-col flex-1'>
          {isActive ? (
            <input className={` outline-none border-2 border-brand`} value={name} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} ref={inputRef} />
          ) : (
            <span className={`${completed ? 'line-through text-gray-300' : ''}`} onClick={handleClick}>
              {todo.name}
            </span>
          )}
          <PomodoroIconList estimate={todo.estimate} done={todo.done} />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <span className={todo.deadline < getToday() ? 'text-red-500' : ''}>
          <TodoDate date={todo.deadline} />
        </span>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300'>
          <button type='button' onClick={() => handleDelete(todo.id)}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </li>
  );
}
