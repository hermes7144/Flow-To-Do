import React from 'react';
import { FcTodoList } from 'react-icons/fc';

export default function EmptyTodo() {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <FcTodoList className='w-40 h-40' />
      <p className='text-lg text-bold'>작업할 내용 없음</p>
      <p className='text-gray-400 text-sm'>위의 박스를 클릭해 할 일을 추가해보세요.</p>
    </div>
  );
}
