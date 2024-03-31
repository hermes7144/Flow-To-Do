import React from 'react';
import KanbanItem from './KanbanItem';
import { Droppable } from 'react-beautiful-dnd';
import TodoDate from './TodoDate';

export default function KanbanList({ date, todos }) {
  return (
    <li className='flex flex-col m-1 p-1 min-w-60 basis-60 text-sm'>
      <TodoDate date={date} />
      <Droppable droppableId={date}>
        {(provided, snapshot) => (
          <ul className={`flex flex-col min-h-16 ${snapshot.isDraggingOver ? 'bg-gray-200 opacity-50' : ''}`} ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
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
