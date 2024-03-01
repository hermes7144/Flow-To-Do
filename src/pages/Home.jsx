import React, { Suspense, useState } from 'react';
import TodoList from './../components/TodoList';
import Pomodoro from '../components/Pomodoro';
import PomodoroDashBoard from '../components/PomodoroDashBoard';
import useTodos from '../hooks/useTodos';
import { getNextWeek, getThisWeek, getToday, getTomorrow } from '../js/CommonFunction';
import AddTodo from '../components/AddTodo';
import Sidebar from '../components/Sidebar';
import { useCategoryContext } from '../context/CategoryContext';
import { TbLayoutSidebarLeftExpandFilled, TbLayoutSidebarRightExpandFilled } from 'react-icons/tb';
import Loading from '../components/Loading';

function getDeadline(category) {
  switch (category) {
    case '오늘':
      return getToday();
    case '이번주':
      return getThisWeek();
    default:
      return null;
  }
}

function filterActiveTodos(category, todos) {
  if (category === '내일') {
    const tomorrow = getTomorrow();
    return todos.filter((todo) => todo.status === 'active' && todo.deadline === tomorrow);
  } else if (category === '다음주') {
    const { start: nextWeekStart, end: nextWeekEnd } = getNextWeek();
    return todos.filter((todo) => todo.status === 'active' && todo.deadline >= nextWeekStart && todo.deadline <= nextWeekEnd);
  } else {
    const deadline = getDeadline(category);
    return todos.filter((todo) => todo.status === 'active' && todo.deadline <= deadline);
  }
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const {
    productsQuery: { isLoading, data: todos },
  } = useTodos();

  const { category } = useCategoryContext();

  const handleSheduleClick = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const toggleSidebar = () => setIsOpen((prevState) => !prevState);

  if (isLoading) return <Loading />;

  const activeTodo = filterActiveTodos(category, todos);
  const completedTodo = todos.filter((todo) => todo.status === 'completed' && todo.completedDate === getToday());

  return (
    <div className='flex'>
      {isOpen && (
        <div className='hidden md:block'>
          <Sidebar handleSheduleClick={() => {}} />
        </div>
      )}
      {isHovered && (
        <div className='absolute z-10 bg-white shadow-xl' style={{ height: 'calc(100vh - 57px)' }} onMouseLeave={handleMouseLeave}>
          <Sidebar handleSheduleClick={handleSheduleClick} />
        </div>
      )}
      <div className='flex-1 p-4 relative bg-gray-100 overflow-y-auto' style={{ height: 'calc(100vh - 57px)' }}>
        <div className='flex items-center gap-2'>
          <div onMouseEnter={handleMouseEnter} className='block md:hidden'>
            <TbLayoutSidebarRightExpandFilled className='h-8 w-8 text-gray-300 cursor-pointer' />
          </div>
          <div className='hidden md:block'>
            <button className='text-gray-300 cursor-pointer hover:text-brand hover:opacity-90' onClick={toggleSidebar}>
              <TbLayoutSidebarRightExpandFilled className={`h-8 w-8 ${isOpen ? '' : 'rotate-180'}`} />
            </button>
          </div>
          <span className='text-xl font-bold'>{category}</span>
        </div>
        <PomodoroDashBoard activeTodo={activeTodo} completedCount={completedTodo.length} thisWeek={['오늘', '이번 주'].includes(category)} />
        <AddTodo />
        <TodoList activeTodo={activeTodo} completedTodo={completedTodo} />
        <Pomodoro />
      </div>
    </div>
  );
}
