import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';
import { FaClock, FaStopwatch, FaTimes } from 'react-icons/fa';

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [estimate, setEstimate] = useState(0);

  const handleSubmit = (e) => {
    console.log('1211212');
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
    setDeadline(null);
    setEstimate(0);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (date) => {
    setDeadline(date);
  };

  const handleEstimate = (e) => {
    setEstimate(e.target.value);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <button type='button' className='custom-datepicker-input' onClick={onClick}>
      {value || <CiCalendar className='w-4 h-4 ml-3 mt-1' />}
    </button>
  );

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
        <div className='flex items-center gap-[2px]'>
          <div className='w-10 bg-white'></div>
          <div className='flex bg-white text-gray-300 gap-1 text-lg mr-2'>
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 1 ? 'text-brand' : ''
              }`}
              onClick={() => setEstimate(1)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 2 ? 'text-brand' : ''
              }`}
              onClick={() => setEstimate(2)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 3 ? 'text-brand' : ''
              }`}
              onClick={() => setEstimate(3)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 4 ? 'text-brand' : ''
              }`}
              onClick={() => setEstimate(4)}
            />
            <FaStopwatch
              className={`hover:cursor-pointer ${
                estimate >= 5 ? 'text-brand' : ''
              }`}
              onClick={() => setEstimate(5)}
            />
          </div>
          <div className='w-[1px] h-4 bg-slate-500'></div>
          <div className='w-12 pl-1 my-1'>
            <DatePicker
              selected={deadline}
              onChange={handleDateChange}
              customInput={<CustomDatePickerInput />}
              dateFormat='MM/dd'
              showPopperArrow={false}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
