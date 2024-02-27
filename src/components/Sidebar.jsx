import React from 'react';
import SidebarItem from './SidebarItem';
import { PiSun, PiSunHorizonFill } from 'react-icons/pi';
import { RiCalendar2Fill, RiCalendarCheckFill } from 'react-icons/ri';

const categories = [
  { title: '오늘', icon: <PiSun className='h-6 w-6 text-red-400' /> },
  { title: '내일', icon: <PiSunHorizonFill className='h-6 w-6 text-orange-400' /> },
  { title: '이번주', icon: <RiCalendar2Fill className='h-6 w-6 text-emerald-400' /> },
  { title: '다음주', icon: <RiCalendarCheckFill className='h-6 w-6 text-blue-400' /> },
];

export default function Sidebar({ handleSheduleClick }) {
  return (
    <div className='w-1/6 min-w-60 flex flex-col'>
      {categories.map((item) => (
        <SidebarItem key={item.title} item={item} handleSheduleClick={handleSheduleClick} />
      ))}
    </div>
  );
}
