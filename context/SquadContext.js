import React, { createContext, useState } from 'react';

export const SquadContext = createContext();

export const SquadProvider = ({ children }) => {
  const [squadList, setSquadList] = useState([]);

  const addTeammate = (teammate) => {
    setSquadList([...squadList, teammate]);
  };

  return (
    <SquadContext.Provider value={{ squadList, addTeammate }}>
      {children}
    </SquadContext.Provider>
  );
};
