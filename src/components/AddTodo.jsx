import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';

import 'react-datepicker/dist/react-datepicker.css';
import { FaStopwatch } from 'react-icons/fa';
import { useCategoryContext } from '../context/CategoryContext';
import { getNextWeek, getThisWeek, getToday, getTomorrow } from '../js/CommonFunction';

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [estimate, setEstimate] = useState(0);
  const { category } = useCategoryContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) return;

    function getDeadline(category) {
      switch (category) {
        case '오늘':
          return getToday();
        case '내일':
          return getTomorrow();
        case '이번주':
          return getThisWeek();
        case '다음주':
          return getNextWeek().end;
        default:
          return null;
      }
    }

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

  const handleEstimate = (pomodoro) => {
    setEstimate(pomodoro);
  };
  const iconRange = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex my-3 bg-white items-center p-2 rounded-lg'>
        <input className='w-44 xs:flex-1 focus:outline-none' type='text' value={input} onChange={handleChange} placeholder={`+ "${category} 할 일"을 추가하세요.`} />
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
