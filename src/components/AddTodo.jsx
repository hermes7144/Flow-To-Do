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
  const iconRange = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex my-3 bg-white items-center p-2 rounded-lg'>
        <input
          className='w-48 xs:flex-1 focus:outline-none'
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='+ 할 일 추가'
        />
        <div className='w-[1px] h-4 bg-slate-500 mx-2'></div>
        <div className='flex min-w-14 items-center'>
          <div className='flex bg-white text-gray-300 gap-1 text-lg mr-2 opacity-50'>
            {iconRange.map((value) => (
              <FaStopwatch
                key={value}
                className={`hover:cursor-pointer ${
                  estimate >= value ? 'text-brand' : ''
                }`}
                onClick={() =>
                  handleEstimate(estimate === value ? value - 1 : value)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
