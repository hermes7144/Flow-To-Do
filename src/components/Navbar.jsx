import React from 'react'
import { TbClock2 } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { GoGraph } from "react-icons/go";
import { login } from '../api/firebase';

export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2 font-semibold'>
        <Link to='/' className='flex items-center text-4xl text-brand'>
        <TbClock2/>
        <h1>Focus To-Do</h1>
        </Link>
        <nav className='flex items-center gap-4'>
          <Link to='/report' className='text-2xl'>
            <GoGraph />
          </Link>
        <button onClick={login}>Login</button>
        </nav>
    </header>

  )
}
