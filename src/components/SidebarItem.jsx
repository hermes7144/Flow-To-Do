import React from 'react';
import { useCategoryContext } from '../context/CategoryContext';

export default function SidebarItem({ item, handleSheduleClick }) {
  const { category, setCategory } = useCategoryContext();
  const handleClick = (selectedCategory) => {
    setCategory(selectedCategory);
    handleSheduleClick();
  };
  return (
    <div className={`flex p-1 m-1 gap-1 rounded-lg cursor-pointer  ${category === item.title ? 'bg-slate-200' : 'hover:bg-slate-100'}`} onClick={() => handleClick(item.title)}>
      {item.icon}
      {item.title}
    </div>
  );
}
