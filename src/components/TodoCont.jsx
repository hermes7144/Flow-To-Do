import React from 'react';

export default function TodoCont({ children }) {
  return (
    <div className='flex-1 p-4 bg-gray-100 overflow-y-auto' style={{ height: 'calc(100vh - 57px)' }}>
      {children}
    </div>
  );
}
