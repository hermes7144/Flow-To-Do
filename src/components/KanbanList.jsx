import React from 'react';
import KanbanItem from './KanbanItem';
import { Droppable } from 'react-beautiful-dnd';
import TodoDate from './TodoDate';

export default function KanbanList({ date, index, todos }) {
  return (
    <li className='flex flex-col m-1 p-1 min-w-80'>
      <span className='font-bold'>{index === 0 ? '기한 초과' : <TodoDate date={date} />}</span>
      <Droppable droppableId={date}>
        {(provided, snapshot) => (
          <ul className={`flex flex-col min-h-16 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`} ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
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
