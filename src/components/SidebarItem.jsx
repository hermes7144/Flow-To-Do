import React from 'react';

export default function SidebarItem({ item, category, handleSheduleClick }) {
  const handleClick = (selectedCategory) => {
    handleSheduleClick(selectedCategory);
  };
  return (
    <div className={`flex text-sm p-1 m-1 gap-1 rounded-lg cursor-pointer ${category === item.title ? 'bg-slate-200' : 'hover:bg-slate-100'}`} onClick={() => handleClick(item.title)}>
      {item.icon}
      {item.title}
    </div>
  );
}
