import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isAuthLoading, setisAuthLoading] = useState(true);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
      setisAuthLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
