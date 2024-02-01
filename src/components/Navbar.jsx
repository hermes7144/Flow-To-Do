import React from 'react';
import { TbClock2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { GoGraph } from 'react-icons/go';
import User from './User';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-300 p-2 font-semibold bg-white'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <TbClock2 />
        <h1 className='hidden md:block'>Flow To-Do</h1>
      </Link>
      <nav className='flex items-center gap-4'>
        <Link to='/report' className='text-2xl'>
          <GoGraph />
        </Link>
        {user && <User user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
}
