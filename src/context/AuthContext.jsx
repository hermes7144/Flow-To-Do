import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import { login, logout, onUserStateChange } from '../api/firebase';

 const AuthContext = createContext(null);

 export function  AuthContextProvider({children})  {
    const [user, setUser] = useState();

    useEffect(() => {
      onUserStateChange(setUser)
    },[]);

    return <AuthContext.Provider value={{user , uid: user&& user.uid,login, logout }}>
        {children}
    </AuthContext.Provider>
 }

 export function useAuthContext() {
    return useContext(AuthContext);
  }