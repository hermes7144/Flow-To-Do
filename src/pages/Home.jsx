import React, { useState } from 'react';
import Pomodoro from '../components/Pomodoro';
import TodoHeader from '../components/TodoHeader';
import Todo from '../components/Todo';
import SidebarCont from '../components/SidebarCont';
import TodoCont from '../components/TodoCont';
import NonModal from '../components/NonModal';
import { BsThreeDots } from 'react-icons/bs';
import Kanban from '../components/Kanban';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState('오늘');
  const [view, setView] = useState('LIST');
  const [showOption, setShowOption] = useState(false);

  const handleViewClick = (view) => {
    setView(view);
  };

  const handleOptionClick = () => {
    setShowOption(false);
  };

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
      {view === 'LIST' && <SidebarCont isOpen={isOpen} isHovered={isHovered} setIsHovered={setIsHovered} category={category} handleSheduleClick={handleSheduleClick} />}
      <TodoCont>
        <div className='flex justify-between'>
          {view === 'LIST' ? <TodoHeader isOpen={isOpen} toggleSidebar={toggleSidebar} handleMouseEnter={handleMouseEnter} category={category} view={view} /> : <div></div>}

          <button className='hover:bg-gray-200 p-1' onClick={() => setShowOption((prev) => !prev)}>
            <BsThreeDots className='h-6 w-6 text-gray-300' />
          </button>
          <NonModal show={showOption} handleOptionClick={handleOptionClick} handleViewClick={handleViewClick} />
        </div>
        {view === 'LIST' ? <Todo category={category} /> : <Kanban />}
      </TodoCont>
      <Pomodoro />
    </div>
  );
}
