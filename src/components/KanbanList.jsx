import React from 'react';
import KanbanItem from './KanbanItem';
import { Droppable } from 'react-beautiful-dnd';

export default function KanbanList({ date, todos }) {
  return (
    <li className='flex flex-col m-1 bg-slate-200 w-40 basis-40 '>
      {date}
      <Droppable droppableId={date}>
        {(provided, snapshot) => (
          <ul className={`flex flex-col min-h-16 ${snapshot.isDraggingOver ? 'bg-slate-500' : ''}`} ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
            {todos.map((todo, index) => (
              <KanbanItem key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </li>
  );
}
