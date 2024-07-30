import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * SlotValueInput component for editing and displaying a value.
 *
 * @param {boolean} [noInput=false] - If true, no input will be shown
 * @param {string} title - The title of the input
 * @param {string} value - The current value of the input
 * @param {Function} fetchFunction - Function to call when a new value is submitted
 * @param {Array<string> | boolean} [options=false] - Options for the select input, or false if not used
 */
const SlotValueInput = ({
  noInput = false,
  title,
  value,
  fetchFunction,
  options = false,
}) => {
  const [inputMode, setInputMode] = useState(false);
  const [valueInput, setValueInput] = useState(value);

  const toggleInputMode = () => {
    if (inputMode) {
      setInputMode(false);
      fetchFunction(valueInput);
    } else {
      setInputMode(true);
    }
  };

  return (
    <SlotValueInputContainer>
      <span>{title}</span>
      <ItemContent>
        {!noInput && (
          <button type="button" onClick={toggleInputMode}>
            {inputMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                  fill="#4caf50"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            )}
          </button>
        )}
        {inputMode &&
          !noInput &&
          (options ? (
            <select onChange={(event) => setValueInput(event.target.value)}>
              {options.map((o) => (
                <option key={o} selected={o === value} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={valueInput}
              onChange={(event) => setValueInput(event.target.value)}
              placeholder={`Edit the ${title}`}
            />
          ))}
        {(!inputMode || noInput) && (
          <span
            tabIndex={0}
            role="button"
            onKeyDown={() => setInputMode(true)}
            onClick={() => setInputMode(true)}
          >
            {valueInput}
          </span>
        )}
      </ItemContent>
    </SlotValueInputContainer>
  );
};

const SlotValueInputContainer = styled.div`
  padding: 10px 30px;

  span {
    color: black;
    font-weight: 400;
    font-size: 18px;
    display: block;
    margin-bottom: 5px;
  }
`;

const ItemContent = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #c4c4c4;
  border-radius: 3px;

  button {
    float: right;
    border: none;
    height: 33px;
    padding: 0 20px;
    background: unset;
  }

  input,
  select {
    padding-bottom: 7px;
    background: #c4c4c4;
    border: none;
    border-bottom: 1px solid black;
    color: black;
    font-weight: 400;
    font-size: 18px;
    font-family: Quicksand;
  }
`;

export default SlotValueInput;
