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

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          token,
        },
      });
      if(data.success){
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
    setUser(null);
    setCredit(null);
    toast.success("Logged out successfully");
  }
  const value = {
    user,
    setUser,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
