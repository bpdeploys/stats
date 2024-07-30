import React from 'react';
import styled from 'styled-components';

/**
 * Circle component
 *
 * @param {boolean} active - Determines if the circle is active
 * @param {string} text - Text to display inside the circle
 * @param {string} bgActive - Background color when the circle is active
 * @param {boolean} right - Determines if there should be a right margin
 * @param {string} [bgNoActive='transparent'] - Background color when the circle is not active
 * @param {function} onClick - Function to handle click event
 * @param {...object} rest - Other props passed to the button element
 */
const Circle = ({
  active,
  text,
  bgActive,
  right,
  bgNoActive = 'transparent',
  ...rest
}) => {
  const CircleButton = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: ${active ? bgActive : bgNoActive};
    margin-right: ${right ? '20px' : '0'};
    border: 1px solid ${active ? '#FFFFFF' : bgActive};
    color: ${active ? '#FFFFFF' : bgActive};
    transition: all 0.2s;
    ${active ? 'transform: scale(1.2, 1.2)' : ''}
  `;

  return (
    <CircleButton type="button" {...rest}>
      {text}
    </CircleButton>
  );
};

export default Circle;
