import React, { useState } from 'react';
import Image from 'next/image';
import styles from './input.module.scss';

/**
 * Input component
 *
 * @param {string} id The unique identifier of the input field
 * @param {string} placeholder The placeholder text of the input field
 * @param {string} name The name of the input field
 * @param {string} value The initial value of the input field
 * @param {string} type The type of the input field (e.g. "text", "email", "password")
 * @param {function} onChange The function to be called when the value of the input field changes
 * @param {function} onBlur The function to be called when the input field loses focus
 * @param {string} color The color of the input field (default: "black")
 *
 * @returns {React.Element} A fieldset element containing an input field
 */
const Input = React.forwardRef(
  (
    {
      id,
      placeholder,
      name,
      value,
      type,
      onChange,
      onBlur,
      color = 'black',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    const inputColorClass =
      color === 'white' ? styles.input__white : styles.input__black;

    return (
      <fieldset className={`${styles.input} ${inputColorClass}`}>
        <label>{placeholder}</label>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          {...props}
        />
        {type === 'password' && (
          <Image
            src={
              showPassword
                ? '/assets/imgs/svgs/eye.svg'
                : '/assets/imgs/svgs/eye-off.svg'
            }
            width={20}
            height={20}
            className={styles.passwordToggleButton}
            onClick={handleTogglePassword}
          />
        )}
      </fieldset>
    );
  }
);

export default Input;
