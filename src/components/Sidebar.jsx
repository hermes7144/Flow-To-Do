import React from 'react';
import SidebarItem from './SidebarItem';
import { PiSun, PiSunHorizonFill } from 'react-icons/pi';
import { RiCalendar2Fill, RiCalendarCheckFill } from 'react-icons/ri';

const categories = [
  { title: '오늘', icon: <PiSun className='h-6 w-6 text-red-400' /> },
  { title: '내일', icon: <PiSunHorizonFill className='h-6 w-6 text-orange-400' /> },
  { title: '이번 주', icon: <RiCalendar2Fill className='h-6 w-6 text-emerald-400' /> },
  { title: '다음 주', icon: <RiCalendarCheckFill className='h-6 w-6 text-blue-400' /> },
];

export default function Sidebar({ category, handleSheduleClick }) {
  return (
    <div className='min-w-40 flex flex-col bg-white shadow-xl' style={{ height: 'calc(100vh - 57px)' }}>
      {categories.map((item) => (
        <SidebarItem key={item.title} item={item} category={category} handleSheduleClick={handleSheduleClick} />
      ))}
    </div>
  );
}
