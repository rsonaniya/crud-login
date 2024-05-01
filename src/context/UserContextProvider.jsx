import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const localStorageAuthUser = localStorage.getItem("authUser");
  const [authUser, setAuthUser] = useState(localStorageAuthUser ? JSON.parse(localStorageAuthUser) : []);

  return <UserContext.Provider value={{ authUser, setAuthUser }}>{children}</UserContext.Provider>;
}
