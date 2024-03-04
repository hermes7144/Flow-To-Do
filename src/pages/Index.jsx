import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import Home from './Home';
import Landing from './Landing';
import Loading from '../components/Loading';

export default function Index() {
  const { user, isAuthLoading } = useAuthContext();

  if (isAuthLoading) return <Loading />;

  return user ? <Home /> : <Landing />;
}
