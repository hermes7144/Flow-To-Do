import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { SyncLoader } from 'react-spinners';
import Home from './Home';
import Landing from './Landing';

export default function Index() {
  const { user, isAuthLoading } = useAuthContext();

  if (isAuthLoading)
    return (
      <div className='flex items-center justify-center h-dvh overflow-y-hidden  overflow-x-hidden'>
        <SyncLoader color='#fe5a4a' />
      </div>
    );

  return user ? <Home /> : <Landing />;
}
