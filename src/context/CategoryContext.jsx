import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [category, setCategory] = useState('오늘');

  return <CategoryContext.Provider value={{ category, setCategory }}>{children}</CategoryContext.Provider>;
}

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
