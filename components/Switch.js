import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ on, width, textLeft, textRight, color, ...props }) => {
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

Switch.propTypes = {
  on: PropTypes.bool.isRequired,
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
};

Switch.defaultProps = {
  color: 'black',
  textLeft: 'Off',
  textRight: 'On',
  width: '90px',
};

export default Switch;
