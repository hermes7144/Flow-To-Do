import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';

import { FaStopwatch } from 'react-icons/fa';
import { getDeadline } from '../js/CommonFunction';

export default function AddTodo({ category }) {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [estimate, setEstimate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    const todo = {
      name: input,
      deadline: getDeadline(category),
      estimate,
    };

    addTodo.mutate(todo);
    setInput('');
    setEstimate(0);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEstimate = (p) => {
    setEstimate(p);
  };
  const iconRange = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex my-3 bg-white items-center p-2 rounded-lg'>
        <input className='w-44 xs:flex-1 focus:outline-none' type='text' value={input} onChange={handleChange} placeholder={`+ "${category} 할 일" 추가`} />
        <div className='w-[1px] h-4 bg-slate-500 mx-2'></div>
        <div className='flex min-w-14 items-center'>
          <div className='flex bg-white text-gray-300 gap-1 text-lg mr-2 opacity-50'>
            {iconRange.map((value) => (
              <FaStopwatch key={value} className={`hover:cursor-pointer ${estimate >= value ? 'text-brand' : ''}`} onClick={() => handleEstimate(estimate === value ? value - 1 : value)} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
