import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TodoDate from './TodoDate';
import useTodos from '../hooks/useTodos';
import { usePomodoroContext } from '../context/PomodoroContext';
import { getToday } from '../js/CommonFunction';

export default function KanbanItem({ todo, index }) {
  const { runningTodo, setRunningTodo, setIsRunning } = usePomodoroContext();

  const { updateTodo } = useTodos();

  const handleUpdate = (todo) => {
    updateTodo.mutate({
      ...todo,
      completedDate: todo.status === 'active' ? getToday() : '',
      status: todo.status === 'active' ? 'completed' : 'active',
    });

    if (todo.status === 'active' && runningTodo?.id === todo.id) {
      setRunningTodo(null);
      setIsRunning(false);
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div className='flex bg-white rounded-lg gap-2 m-1 shadow-md' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className='ml-1 mt-1'>
            <input type='checkbox' onClick={() => handleUpdate(todo)} checked={todo.status === 'completed'} />
          </div>
          <div className='flex flex-col text-xs'>
            <div className='outline-none w-full  overflow-ellipsis'>{todo.name}</div>
            <TodoDate date={todo.deadline} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
