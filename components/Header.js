import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';

/**
 * Header Component
 * @param {Object} props - Component properties
 * @param {string} name - The name to display in the header
 * @param {React.ReactNode|boolean} [buttonRight=false] - The right element in the header, if any
 * @param {boolean} [white=false] - Determines the color theme of the header
 * @param {function} [onClick=() => Router.back()] - Function to handle click event on the left button
 * @returns {React.ReactElement} Rendered component
 */
const Header = ({
  name,
  buttonRight = false,
  white = false,
  onClick = () => Router.back(),
}) => {
  return (
    <StyledHeader white={white}>
      <LeftButton type="button" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill={white ? 'black' : 'white'}
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          />
        </svg>
      </LeftButton>
      <div>
        <span>{name}</span>
      </div>
      <RightElement>
        {buttonRight ? (
          <div className="right-element">{buttonRight}</div>
        ) : (
          <div />
        )}
      </RightElement>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 45px;
  background-color: ${({ white }) => (white ? 'white' : 'black')};

  button {
    height: 100%;
    background-color: ${({ white }) => (white ? 'white' : 'black')};
    border: none;
  }

  span {
    color: ${({ white }) => (white ? 'black' : 'white')};
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    > span {
      font-size: 20px;
    }
  }
`;

const LeftButton = styled.button`
  height: 100%;
`;

const RightElement = styled.span`
  text-align: right;
  margin-right: 10px;
`;

export default Header;
