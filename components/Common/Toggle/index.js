import React, { useState, useEffect } from 'react';
import styles from './toggle.module.scss';

const Toggle = ({
  id,
  checked,
  onChange,
  label = 'Toggle',
  className = '',
  style = {},
  showText = true,
}) => {
  const handleSpanClick = () => {
    // Create a mock event object with the new 'checked' value
    const event = { target: { checked: !checked } };
    onChange(event);
  };

  return (
    <div className={`${styles.toggleSwitch} ${className}`} style={style}>
      <input
        type="checkbox"
        id={id}
        className={styles.toggleSwitch__checkbox}
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <label htmlFor={id} className={styles.toggleSwitch__label}>
        {label}
      </label>
      {showText && (
        <span
          onClick={handleSpanClick}
          className={
            checked
              ? styles.toggleSwitch__checked
              : styles.toggleSwitch__unchecked
          }
        >
          {checked ? 'Yes' : 'No'}
        </span>
      )}
    </div>
  );
};

export default Toggle;
