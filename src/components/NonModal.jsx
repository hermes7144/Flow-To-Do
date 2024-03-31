import React from 'react';
import { MdListAlt } from 'react-icons/md';
import { MdOutlineViewKanban } from 'react-icons/md';

export default function NonModal({ show, handleOptionClick, handleViewClick }) {
  const handleClick = (view) => {
    handleOptionClick();
    handleViewClick(view);
  };

  return (
    <div className={`z-10 h-16 w-24 bg-white shadow-lg top-24 right-3 rounded-lg p-1 ${show ? 'absolute' : 'hidden'}`}>
      <div className='text-gray-400 text-sm text-left p-1'>뷰</div>
      <div className='flex gap-2 text-gray-500'>
        <button className='hover:bg-gray-200' onClick={() => handleClick('LIST')}>
          <MdListAlt className='h-6 w-6' />
        </button>
        <button className='hover:bg-gray-200 cursor-pointer' onClick={() => handleClick('KANBAN')}>
          <MdOutlineViewKanban className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
}
