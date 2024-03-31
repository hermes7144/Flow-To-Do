import React from 'react';
import SidebarToggle from '../components/SidbarToggle';

export default function TodoHeader({ isOpen, toggleSidebar, handleMouseEnter, category }) {
  return (
    <div className='flex items-center gap-2 relative'>
      <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} handleMouseEnter={handleMouseEnter} />
      <span className='text-xl font-bold'>{category}</span>
    </div>
  );
}
