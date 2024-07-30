import React from 'react';
import styled from 'styled-components';

/**
 * Toggle component for switching between two states.
 *
 * @param {string} id - The id of the toggle
 * @param {boolean} checked - Indicates if the toggle is checked
 * @param {function} onChange - Function called when the toggle is changed
 * @param {string} [label='Toggle'] - The label of the toggle
 * @param {string} [className=''] - Additional class names for styling
 * @param {object} [style={}] - Additional styles for the toggle container
 * @param {boolean} [showText=true] - Indicates whether to show the text
 * @param {string} [yesText='Yes'] - The text to display when the toggle is checked
 * @param {string} [noText='No'] - The text to display when the toggle is unchecked
 * @return {JSX.Element} The rendered Toggle component
 */
const Toggle = ({
  id,
  checked,
  onChange,
  label = 'Toggle',
  className = '',
  style = {},
  showText = true,
  yesText = 'Yes',
  noText = 'No',
  lineup = false,
}) => {
  const handleSpanClick = () => {
    const event = { target: { checked: !checked } };
    onChange(event);
  };

  return (
    <ToggleContainer className={`toggleSwitch ${className}`} style={style}>
      <ToggleInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        aria-label={label}
        onClick={handleSpanClick}
      />
      <ToggleLabel htmlFor={id} onClick={handleSpanClick}>
        {label}
      </ToggleLabel>
      {showText && (
        <ToggleText onClick={handleSpanClick} checked={checked}>
          {checked ? yesText : noText}
        </ToggleText>
      )}
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const ToggleInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  display: none;
`;

const ToggleLabel = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 66px;
  height: 25px;
  background: #e5e5e5;
  display: block;
  border-radius: 100px;
  position: relative;
  transition: 0.3s;

  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 16px;
    height: 16px;
    background: #000;
    border-radius: 90px;
    transition: 0.3s;
  }

  &:active:after {
    width: 25px;
  }

  ${ToggleInput}:checked + &::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  ${ToggleInput}:checked + &::after {
    background: #125b9f;
  }
`;

const ToggleText = styled.span`
  position: absolute;
  top: 50%;
  font-size: 12px;
  cursor: pointer;
  transform: translateY(-50%);
  left: ${(props) => (props.checked ? '15%' : '45%')};
  width: ${(props) => (props.checked ? 'auto' : '28px')};
  text-align: ${(props) => (props.checked ? 'left' : 'right')};
`;

export default Toggle;
