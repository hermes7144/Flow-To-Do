import React from 'react';

export default function EmptyTodo() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <img src='/todolist.webp' alt='이미지 설명' className='h-40 w-40 m-4' />
      <p className='text-sm font-bold'>위의 박스에 할 일을 추가해보세요.</p>
      <a className='text-xs text-gray-400 ' href='https://www.flaticon.com/free-icons/to-do-list' title='to do list icons'>
        To do list icons created by Freepik - Flaticon
      </a>
    </div>
  );
}
