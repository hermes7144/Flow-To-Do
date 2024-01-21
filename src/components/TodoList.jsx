import React from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import useTodos from '../hooks/useTodos'

export default function TodoList() {
  const {productsQuery: {isLoading, error, data:todos}} = useTodos();

  if (isLoading) return <p>Loading...</p>;
  const hasTodos = todos && todos.length > 0;
return (
  <div>
      <AddTodo/>
      {!hasTodos && <p>할 일 목록이 없습니다.</p>}
      {hasTodos && <>
      <ul>
        {todos && todos.map(todo => <TodoItem key={todo.id} todo={todo} />) }
      </ul>
      </>}
  </div>
)
}
