import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TodoDate from './TodoDate';
import useTodos from '../hooks/useTodos';
import { usePomodoroContext } from '../context/PomodoroContext';
import { getDate } from '../js/CommonFunction';
import { FaRegPlayCircle, FaStopwatch } from 'react-icons/fa';

export default function KanbanItem({ todo, index }) {
  const { isRunning, runningTodo, setRunningTodo, setIsRunning } = usePomodoroContext();

  const { updateTodo } = useTodos();

  const handleStart = (todo) => {
    setRunningTodo(todo);
    setIsRunning(true);
  };

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

  return (
    <div>
      <Draggable draggableId={todo.id} index={index}>
        {(provided) => (
          <div className='flex items-center bg-white rounded-lg gap-1 m-1 p-1 shadow-md' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <input type='checkbox' onChange={() => handleUpdate(todo)} checked={todo.status === 'completed'} />
            <button className={` text-brand ${todo.status === 'completed' ? 'opacity-50' : 'opacity-80'}`} onClick={() => handleStart(todo)} disabled={todo.status === 'completed'}>
              {isRunning && runningTodo?.id === todo.id ? <FaStopwatch className='w-4 h-4' /> : <FaRegPlayCircle className='w-4 h-4' />}
            </button>
            <div className='flex flex-col gap-1 w-10/12'>
              <p className='overflow-hidden w-full line-clamp-2'>{todo.name}</p>

              <TodoDate date={todo.deadline} />
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}
