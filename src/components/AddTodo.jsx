import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendar } from 'react-icons/ci';

export default function AddTodo() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;

    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;

    const todo = {
      name: input,
      deadline: dateStr,
      estimate: 0,
    };
    addTodo.mutate(todo);
    setInput('');
    setDeadline(null);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (date) => {
    setDeadline(date);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <button type='button' className='custom-datepicker-input' onClick={onClick}>
      {value || <CiCalendar className='w-5 h-5 ml-3 mt-1' />}
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex mb-5 bg-white items-center p-2 rounded-lg'>
        <input
          className='flex-1 focus:outline-none'
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='+ 할 일 추가'
        />
        <div className='flex items-center gap-[2px]'>
          <div className='w-10 bg-white'></div>
          {/* <div className='bg-white'>
            <input type='text' />
          </div> */}
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
