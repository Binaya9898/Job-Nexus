// UserContext.js
import React, { createContext, useState } from "react";

// Create a context for user data
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children, navigation }) => {
  const [userData, setUserData] = useState(null);

  const logout = () => {
    setUserData(null);
    navigation.navigate("Login");
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
