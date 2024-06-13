import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");
const initialState = JSON.parse(localStorage.getItem("userInfo"));

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
