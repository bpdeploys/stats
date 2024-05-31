import React from 'react';

/**
 * Switch component
 *
 * @param {boolean} on - Indicates if the switch is on
 * @param {string} [width='90px'] - The width of the switch
 * @param {string} [textLeft='Off'] - The text to display when the switch is off
 * @param {string} [textRight='On'] - The text to display when the switch is on
 * @param {string} [color='black'] - The color of the switch when it's on
 * @param {...object} props - Other props passed to the button element
 */
const Switch = ({
  on,
  width = '90px',
  textLeft = 'Off',
  textRight = 'On',
  color = 'black',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`Switch ${!on ? '--no-start' : ''}`}
      {...props}
    >
      {on && (
        <div className="circle">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill={color} />
          </svg>
        </div>
      )}
      <span>{on ? textRight : textLeft}</span>
      {!on && (
        <div className="circle">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#FFFFFF" />
          </svg>
        </div>
      )}
      <style jsx>{`
        .Switch {
          background: #e5e5e5;
          border: 1px solid #cbcbcb;
          box-sizing: border-box;
          border-radius: 55px;
          height: 30px;
          width: ${width};
          padding: 0;
          cursor: pointer;

          .circle {
            display: inline;
            float: right;

            > svg {
              position: relative;
              top: -1px;
            }
          }

          &.--no-start {
            .circle {
              float: left;
              margin-left: 1px;
            }
          }

          span {
            padding: 0 10px;
            font-family: Quicksand;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 28px;
            color: #616060;
          }
        }
      `}</style>
    </button>
  );
};

export default Switch;
