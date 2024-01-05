import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setState(JSON.parse(storedValue));
    }
  }, [key]);

  return [state, setState];
};

export default useLocalStorageState;
