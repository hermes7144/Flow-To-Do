import React from 'react';
import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';
import { useCategoryContext } from '../context/CategoryContext';
import TodoDateRow from './TodoDateRow';
import { getToday } from '../js/CommonFunction';

export default function TodoList({ activeTodo, completedTodo }) {
  const { category } = useCategoryContext();

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
                  lastDate = todo.deadline < getToday() ? getToday() : todo.deadline;

                  return (
                    <React.Fragment key={index}>
                      <TodoDateRow key={lastDate} date={lastDate} />
                      <TodoItem key={todo.id} todo={todo} />
                    </React.Fragment>
                  );
                } else {
                  // lastDate = todo.deadline;
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
