import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function KanbanItem({ todo, index }) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div className='flex bg-white rounded-lg gap-2 m-1 p-1' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <input type='checkbox' />
          <div className='flex flex-col'>
            <div>{todo.name}</div>
            <span>{todo.deadline}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
