import React from 'react';
import { TbLayoutSidebarRightExpandFilled } from 'react-icons/tb';

export default function SidebarToggle({ isOpen, toggleSidebar, handleMouseEnter }) {
  return (
    <>
      <button className='block md:hidden' onMouseEnter={handleMouseEnter}>
        <TbLayoutSidebarRightExpandFilled className='h-8 w-8 text-gray-300' />
      </button>
      <button className='hidden md:block text-gray-300 hover:text-brand hover:opacity-90' onClick={toggleSidebar}>
        <TbLayoutSidebarRightExpandFilled className={`h-8 w-8 ${isOpen ? '' : 'rotate-180'}`} />
      </button>
    </>
  );
}
