import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 relative'>
      <div className='w-full h-full bg-cover bg-banner'></div>
      <div className='absolute w-full top-32 text-center text-gray-100'>
        <h2 className='text-6xl'>Flow To-Do</h2>
        <p className='text-2xl'>Flow 속에서 행복을 찾아보세요</p>
      </div>
    </section>
  );
}
