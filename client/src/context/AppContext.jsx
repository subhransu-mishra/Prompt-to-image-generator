import { createContext, useEffect } from "react";
import { useState } from "react";
export const AppContext = createContext();
import { toast } from "react-toastify";
import axios from "axios";

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [credit, setCredit] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const value = {
    user,
    setUser,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    // loadCreditsData
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
