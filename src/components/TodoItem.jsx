import React, { useRef, useState } from 'react';
import useTodos from '../hooks/useTodos';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegPlayCircle, FaStopwatch } from 'react-icons/fa';
import { getDate } from '../js/CommonFunction';
import { usePomodoroContext } from '../context/PomodoroContext';
import TodoDate from './TodoDate';

export default function TodoItem({ todo, completed }) {
  const [name, setName] = useState(todo.name);
  const inputRef = useRef(null);

  const { runningTodo, setRunningTodo, isRunning, setIsRunning } = usePomodoroContext();
  const { updateTodo, deleteTodo } = useTodos();
  const handleDelete = deleteTodo.mutate;

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      completedDate: todo.status === 'active' ? getDate() : '',
      status: todo.status === 'active' ? 'completed' : 'active',
    });

    if (todo.status === 'active' && runningTodo?.id === todo.id) {
      setRunningTodo(null);
      setIsRunning(false);
    }
  };

  const PomodoroIconList = ({ estimate, done }) => {
    const icons =
      done > 5 ? (
        <div className='flex text-brand gap-1'>
          <div className='flex opacity-80'>
            <FaStopwatch />
            <span>{done}</span>
          </div>
          <span className='text-gray-400'>/</span>
          <div className='flex opacity-40'>
            <FaStopwatch />
            <span>{estimate}</span>
          </div>
        </div>
      ) : estimate > done ? (
        Array.from({ length: estimate }, (_, index) => <FaStopwatch key={index} className={`text-brand ${index + 1 <= done ? 'opacity-80' : 'opacity-40'} `} />)
      ) : (
        Array.from({ length: Math.min(5, done) }, (_, index) => <FaStopwatch key={index} className='text-brand opacity-80' />)
      );

    return <div className='flex'>{icons}</div>;
  };

  const handleStart = (todo) => {
    setRunningTodo(todo);
    setIsRunning(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    todo.name !== name &&
      updateTodo.mutate({
        ...todo,
        name,
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      todo.name !== name &&
        updateTodo.mutate({
          ...todo,
          name,
        });
      inputRef.current.blur();
    }
  };
  return (
    <li className='flex justify-between items-center bg-white p-1 my-1 rounded-md gap-2'>
      <div className='flex items-center w-full'>
        <input className='mr-2' type='checkbox' onChange={() => handleUpdate(todo)} checked={todo.status === 'completed'} />
        <button className={`mr-2 text-brand ${completed ? 'opacity-50' : 'opacity-80'}`} onClick={() => handleStart(todo)} disabled={completed}>
          {isRunning && runningTodo?.id === todo.id ? <FaStopwatch className='w-5 h-5' /> : <FaRegPlayCircle className='w-5 h-5' />}
        </button>
        <div className='flex flex-col w-full gap-1'>
          <input className={`outline-none focus:border focus:border-brand w-full rounded-lg overflow-ellipsis`} value={name} onChange={handleChange} onBlur={handleBlur} onKeyDown={handleKeyDown} ref={inputRef} />
          <PomodoroIconList estimate={todo.estimate} done={todo.done} />
        </div>
      </div>
      <div className='flex items-center gap-1'>
        <span className='w-20 text-center'>
          <TodoDate date={todo.deadline} />
        </span>
        <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer' onClick={() => handleDelete(todo.id)}>
          <FaRegTrashCan />
        </div>
      </div>
    </li>
  );
}
