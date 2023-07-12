import React, { createContext, useContext, useState } from "react";
import { login } from "../api/authenticationService";

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
  const [user, setUser] = useState({
    email: '',
    id: '',
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      const userData = await login(email, password);
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const value = { user, login: handleLogin };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
    return useContext(UserContext);
}