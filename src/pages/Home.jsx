import React, { useState } from 'react';
import Pomodoro from '../components/Pomodoro';
import TodoHeader from '../components/TodoHeader';
import Todo from '../components/Todo';
import SidebarCont from '../components/SidebarCont';
import TodoCont from '../components/TodoCont';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState('오늘');

  const handleSheduleClick = (category) => {
    setCategory(category);
    isHovered && setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className='flex'>
      <SidebarCont isOpen={isOpen} isHovered={isHovered} setIsHovered={setIsHovered} category={category} handleSheduleClick={handleSheduleClick} />
      <TodoCont>
        <TodoHeader isOpen={isOpen} toggleSidebar={toggleSidebar} handleMouseEnter={handleMouseEnter} category={category} />
        <Todo category={category} />
      </TodoCont>
      <Pomodoro />
    </div>
  );
}
