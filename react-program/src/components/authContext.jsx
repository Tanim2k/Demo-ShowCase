import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Check if a token is stored

  const login = () => {
    // Implement your login logic, which should set isLoggedIn to true upon successful login
    // Typically, you'd validate the token here, but for the example, we rely on token existence
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Implement your logout logic here, which should set isLoggedIn to false
    localStorage.removeItem("token"); 
    localStorage.removeItem("id");
    localStorage.removeItem("role");// Clear the token
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
