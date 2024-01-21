import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';

export default function AddTodo() {
  const [input, setInput] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo.mutate(input);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={input} onChange={handleChange} />
    </form>
  );
}
