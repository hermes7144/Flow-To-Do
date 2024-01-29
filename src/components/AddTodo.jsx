import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';

import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';
import { FaClock, FaStopwatch, FaTimes } from 'react-icons/fa';

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [estimate, setEstimate] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const deadline = `${year}-${month}-${day}`;

    const todo = {
      name: input,
      deadline,
      estimate,
    };
    addTodo.mutate(todo);
    setInput('');
    setEstimate(0);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEstimate = (pomodoro) => {
    setEstimate(pomodoro);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex my-3 bg-white items-center p-2 rounded-lg'>
        <input
          className='flex-1 focus:outline-none'
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='+ 할 일 추가'
        />
        <div className='w-[1px] h-4 bg-slate-500 mx-2'></div>
        <div className='flex items-center'>
          <div className='flex bg-white text-gray-300 gap-1 text-lg mr-2 opacity-50'>
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 1 ? 'text-brand' : ''
              }`}
              onClick={() =>
                estimate === 1 ? handleEstimate(0) : handleEstimate(1)
              }
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 2 ? 'text-brand' : ''
              }`}
              onClick={() => handleEstimate(2)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 3 ? 'text-brand' : ''
              }`}
              onClick={() => handleEstimate(3)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 4 ? 'text-brand' : ''
              }`}
              onClick={() => handleEstimate(4)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 5 ? 'text-brand' : ''
              }`}
              onClick={() => handleEstimate(5)}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
