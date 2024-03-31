import React from 'react';
import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';
import { getDate } from '../js/CommonFunction';
import TodoDate from './TodoDate';

export default function TodoList({ activeTodo, completedTodo, category }) {
  const hasTodos = activeTodo && activeTodo.length > 0;
  let lastDate = null;

  return (
    <div className='flex flex-col pb-20'>
      {!hasTodos && <EmptyTodo />}
      {hasTodos && (
        <ul className='flex-1'>
          {category === '오늘' || category === '내일'
            ? activeTodo.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            : activeTodo.map((todo, index) => {
                if (lastDate === null || todo.deadline > lastDate) {
                  lastDate = todo.deadline < getDate() ? getDate() : todo.deadline;

                  return (
                    <React.Fragment key={index}>
                      <TodoDate key={lastDate} date={lastDate} />
                      <TodoItem key={todo.id} todo={todo} />
                    </React.Fragment>
                  );
                } else {
                  return <TodoItem key={todo.id} todo={todo} />;
                }
              })}
        </ul>
      )}

      {completedTodo && (
        <div>
          <div className='m-4'>완료한 할 일</div>
          <ul className='flex-1'>
            {completedTodo.map((todo) => (
              <TodoItem key={todo.id} todo={todo} completed />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
