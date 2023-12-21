import React, { useRef, useState } from 'react';
import styles from './fakeselect.module.scss'; // Assuming the same styles file
import Dropdown from '../Dropdown';

const FakeSelect = ({ options, placeholder, name, color = 'black' }) => {
  return (
    <div className={styles.container}>
      <div>
        <Dropdown
          items={options}
          placeholder={placeholder}
          color={color}
          name={name}
        />
      </div>
      <span className={styles.displayText}></span>
    </div>
  );
};

export default FakeSelect;
