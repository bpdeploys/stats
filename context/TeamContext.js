import { useState, createContext, useContext } from 'react';

export const TeamCreationContext = createContext();

export default function TeamCreationProvider({ children }) {
  const [data, setData] = useState({});

  const setCreateTeamFormValues = (values) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return (
    <TeamCreationContext.Provider value={{ data, setCreateTeamFormValues }}>
      {children}
    </TeamCreationContext.Provider>
  );
}

export const useCreateTeamFormData = () => useContext(TeamCreationContext);
