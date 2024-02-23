import React from 'react';
import { useCategoryContext } from '../context/CategoryContext';

export default function SidebarItem({ item }) {
  const { category, setCategory } = useCategoryContext();

  const handleClick = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  return (
    <div className={`flex p-1 m-1 gap-1 rounded-lg ${category === item.title ? 'bg-slate-200' : ''}`} onClick={() => handleClick(item.title)}>
      {item.icon}
      {item.title}
    </div>
  );
}
