import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserRole } from "../service/api";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setIsAdmin(getUserRole());    // Check if "ROLE_ADMIN" is in the array
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const value = { isAdmin };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

// Proper custom hook that follows React rules
export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};