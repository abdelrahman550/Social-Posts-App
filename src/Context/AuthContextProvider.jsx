import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  // Initializing States
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
