import React, { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState([]);

  const storeSessionData = (data) => {
    setSessionData((prevSessionData) => [...prevSessionData, data]);
  };
  
  return (
    <SessionContext.Provider value={{ sessionData, storeSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};