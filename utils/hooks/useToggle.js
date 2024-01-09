import { useState, useCallback } from 'react';

const useToggle = (initialState = false) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(() => {
    setIsToggled(!isToggled);
  }, [isToggled]);

  return [isToggled, toggle];
};

export default useToggle;
