import React from 'react';

export default function EmptyTodo() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <img src='/todolist.png' alt='이미지 설명' class='h-40 w-40' />
      <p className='text-gray-400 text-sm mt-4'>위의 박스를 클릭해 할 일을 추가해보세요.</p>
      <a className='text-xs' href='https://www.flaticon.com/free-icons/to-do-list' title='to do list icons'>
        To do list icons created by Freepik - Flaticon
      </a>
    </div>
  );
}
