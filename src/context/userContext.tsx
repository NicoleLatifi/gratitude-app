import React, { createContext, useContext, useState } from "react";
// import { login } from "../api/authenticationService";
import { useApp } from "@realm/react";
import Realm from 'realm';

interface UserContextValue {
  login: (email: string, password: string) => Promise<void>;
  user: {
    email: string,
    id: string
  } | null;
}

export const UserContext = createContext<UserContextValue>({
  login: async() => {},
  user: null,
});

export const UserProvider = ({ children }: {
    children: JSX.Element | JSX.Element[];
}) => {
  const app = useApp();

  const [user, setUser] = useState({
    email: '',
    id: '',
  });

  const handleLogin = async (email: string, password: string) => {
    // try {
    //   const userData = await login(email, password);
    //   if (userData) {
    //     setUser(userData);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

    try {
      const credentials = Realm.Credentials.emailPassword("Nicole.Latifi@gmail.com", "password123");

      const user = await app.logIn(credentials);

      setUser({ email: email, id: user.id });
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  const value = { user, login: handleLogin };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
    return useContext(UserContext);
}