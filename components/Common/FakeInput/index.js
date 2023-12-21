import React, { useRef, useState } from 'react';
import styles from './input.module.scss';

const FakeInput = ({ placeholder, name, color = 'black' }) => {
  const displayRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleFakeInputClick = () => {
    if (displayRef.current) {
      displayRef.current.focus();
    }
  };

  const handleDisplayChange = (event) => {
    setInputValue(event.target.value);
  };

  const inputColorClass =
    color === 'white' ? styles.input__white : styles.input__black;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.fakeInput} ${inputColorClass}`}
        onClick={handleFakeInputClick}
      >
        {placeholder}
      </div>
      <input
        type="text"
        name={name}
        value={inputValue}
        className={`${styles.displayText} ${inputColorClass}`}
        onChange={handleDisplayChange}
        ref={displayRef}
      />
    </div>
  );
};

export default FakeInput;
