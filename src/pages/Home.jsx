import React, { useState } from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import AddTodo from '../components/AddTodo';
import Sidebar from '../components/Sidebar';
import { getDeadline, getToday } from '../js/CommonFunction';
import SidebarToggle from '../components/SidbarToggle';

function isDeadlineInRange(deadline, start, end) {
  return deadline >= start && deadline <= end;
}

function filterActiveTodos(category, todos) {
  const deadline = getDeadline(category, true);
  if (!deadline) return [];

  return todos.filter((todo) => todo.status === 'active' && (category === '내일' ? todo.deadline === deadline : category === '다음 주' ? isDeadlineInRange(todo.deadline, deadline.start, deadline.end) : todo.deadline <= deadline));
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState('오늘');

  const {
    productsQuery: { data: todos },
  } = useTodos();

  const handleSheduleClick = (category) => {
    setCategory(category);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const activeTodo = filterActiveTodos(category, todos);
  const completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate === getToday());

  return (
    <div className='flex'>
      {/* desktop sidebar */}
      {isOpen && (
        <div className='hidden md:block'>
          <Sidebar category={category} handleSheduleClick={handleSheduleClick} />
        </div>
      )}
      {/* mobile sidebar */}
      {isHovered && (
        <div className='absolute z-10 bg-white shadow-xl' style={{ height: 'calc(100vh - 57px)' }} onMouseLeave={handleMouseLeave}>
          <Sidebar category={category} handleSheduleClick={handleSheduleClick} />
        </div>
      )}
      <div className='flex-1 p-4 relative bg-gray-100 overflow-y-auto' style={{ height: 'calc(100vh - 57px)' }}>
        <div className='flex items-center gap-2'>
          <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} handleMouseEnter={handleMouseEnter} />
          <span className='text-xl font-bold'>{category}</span>
        </div>
        <PomodoroDashBoard activeTodo={activeTodo} completedCount={completedTodo.length} thisWeek={['오늘', '이번 주'].includes(category)} />
        <AddTodo category={category} />
        <TodoList activeTodo={activeTodo} completedTodo={completedTodo} category={category} />
        <Pomodoro />
      </div>
    </div>
  );
}
