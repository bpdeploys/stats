import React from 'react';
import styled from 'styled-components';

/**
 * Renders a missing player item component with a button to add a player.
 *
 * @param {string} color - The color of the item.
 * @param {string} theme - The theme of the item.
 * @param {function} onClick - The click event handler for the button.
 * @return {JSX.Element} The rendered missing player item component.
 */
const MissingPlayerItem = ({ color, theme, onClick }) => (
  <StyledItem color={color} theme={theme}>
    <div>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12.5" x2="12.5" y2="25" stroke="white" strokeWidth="2" />
        <line y1="12.5" x2="25" y2="12.5" stroke="white" strokeWidth="2" />
      </svg>

      <div className="corner" />
    </div>
    <div>
      <button type="button" className="add-player" onClick={onClick}>
        Add player
      </button>
    </div>
  </StyledItem>
);

const StyledItem = styled.div`
  background: white;
  margin-top: 10px;
  display: flex;
  height: 60px;

  .add-player {
    height: 30px;
    border-radius: 50px;
    border: none;
    font-size: 15px;
    color: #fff;
    background: rgba(199, 20, 20, 1);
    padding: 5px 15px;
    font-family: Quicksand;
  }

  > div {
    padding: 5px;

    &:nth-child(2) {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-end;
      background-color: ${({ theme }) =>
        theme === 'default' ? 'transparent' : theme};
      justify-content: center;
    }

    &:nth-child(1) {
      background-color: ${({ color }) => color};
      display: flex;
      align-items: center;
      position: relative;
      webkit-clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
      clip-path: polygon(0 0, 100% 0, 73% 100%, 0 100%);
      width: 350px;

      > svg {
        margin-left: 40px;
      }

      > button {
        height: 30px;
        border-radius: 50px;
        border: none;
        font-size: 15px;
        color: #fff;
        background: rgba(199, 20, 20, 1);
        padding: 5px 15px;
        font-family: Quicksand;
      }

      > .corner {
        display: none;
      }
    }
  }
`;

export default MissingPlayerItem;
