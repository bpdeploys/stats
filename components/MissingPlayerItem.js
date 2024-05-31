import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a missing player item component with a button to add a player.
 *
 * @param {string} color - The color of the item.
 * @param {string} theme - The theme of the item.
 * @param {function} onClick - The click event handler for the button.
 * @return {JSX.Element} The rendered missing player item component.
 */
const MissingPlayerItem = ({ color, theme, onClick }) => (
  <div className="Item">
    <div>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="12.5" x2="12.5" y2="25" stroke="white" stroke-width="2" />
        <line y1="12.5" x2="25" y2="12.5" stroke="white" stroke-width="2" />
      </svg>

      <div className="corner" />
    </div>
    <div>
      <>
        <button type="button" className="add-player" onClick={onClick}>
          Add player
        </button>
      </>
    </div>

    <style jsx>{`
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

      .Item {
        background: white;
        margin-top: 10px;
        display: flex;
        height: 60px;

        svg {
          margin-left: 40px;
        }

        > div {
          padding: 5px;

          &:nth-child(2) {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: flex-end;
            background-color: ${theme === 'default' ? 'transparent' : theme};
            justify-content: center;
          }

          &:nth-child(1) {
            background-color: ${color};
            display: flex;
            align-items: center;
            position: relative;
            webkit-clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
            clip-path: polygon(0 0, 100% 0, 73% 100%, 0 100%);
            width: 350px;

            > img,
            > button > img {
              margin-left: 20px;
              width: 50px;
              height: 50px;
              background: white;
              border-radius: 50px;
            }

            > button {
              background: transparent;
              border: none;
            }

            > .number {
              color: white;
              font-size: 41px;
              display: block;
              position: absolute;
              width: 57px;
              text-align: center;
              right: 41px;
            }

            > .corner {
              display: none;
            }
          }
        }
      }
    `}</style>
  </div>
);

export default MissingPlayerItem;
