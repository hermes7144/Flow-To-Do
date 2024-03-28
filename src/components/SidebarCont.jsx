import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';

export default function SidebarCont({ isOpen, category, handleSheduleClick, isHovered, setIsHovered }) {
  const side = useRef();

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isHovered && (!sideArea || !sideCildren)) {
      setIsHovered(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  });

  return (
    <>
      {/* desktop sidebar */}
      {isOpen && (
        <div className='hidden md:block'>
          <Sidebar category={category} handleSheduleClick={handleSheduleClick} />
        </div>
      )}
      {/* mobile sidebar */}
      <div ref={side} className={`${isHovered ? 'absolute' : 'hidden'} z-10`}>
        <Sidebar category={category} handleSheduleClick={handleSheduleClick} />
      </div>
    </>
  );
}
