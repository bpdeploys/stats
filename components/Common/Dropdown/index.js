import React, { useState } from 'react';
// Styles
import styles from './dropdown.module.scss';

/**
 * Dropdown component
 *
 * @param {string} id The unique identifier of the dropdown field
 * @param {string} name The name of the dropdown field
 * @param {string} placeholder The placeholder text of the dropdown field
 * @param {string} value The initial value of the dropdown field
 * @param {function} onChange The function to be called when the value of the dropdown field changes
 * @param {function} onBlur The function to be called when the dropdown field loses focus
 * @param {array} items An array of objects containing the dropdown options. Each object should have a `label` and `value` property.
 * @param {string} color The color of the dropdown field (default: "black")
 *
 * @returns {React.Element} A fieldset element containing a dropdown field
 */
const Dropdown = React.forwardRef(
  (
    {
      id,
      name,
      placeholder,
      value,
      onChange,
      onBlur,
      items,
      color = 'black',
      ...props
    },
    ref
  ) => {
    const dropdownColorClass =
      color === 'white' ? styles.dropdown__white : styles.dropdown__black;

    return (
      <fieldset className={`${styles.dropdown} ${dropdownColorClass}`}>
        <label>{placeholder}</label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue="DEFAULT"
          ref={ref}
          {...props}
        >
          <option value="DEFAULT" disabled>
            {placeholder}
          </option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </fieldset>
    );
  }
);

export default Dropdown;
