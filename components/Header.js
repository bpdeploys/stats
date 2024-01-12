import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

const Header = ({ name, buttonRight, white, onClick }) => {
  return (
    <div className="Header">
      <span>
        <button type="button" onClick={onClick}>
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
        </button>
      </span>
      <div>
        <span>{name}</span>
      </div>
      <span>
        {buttonRight ? (
          <div className="right-element">{buttonRight}</div>
        ) : (
          <div />
        )}
      </span>
      <style jsx>{`
        .Header,
        .Header > span {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap; /* so they do not overlap each other if space too short */
        }

        .Header > span {
          flex: 2; /* 2 is minimum but plenty enough here  */

          &:first-of-type:after,
          &:last-of-type:before {
            content: '';
            display: inline-block; /* enough , no width needed , it will still generate a space between */
          }
        }

        .Header {
          height: 45px;
          background-color: ${white ? 'white' : 'black'};

          button {
            height: 100%;
            background-color: ${white ? 'white' : 'black'};
            border: none;
          }

          span {
            color: ${white ? 'black' : 'white'};
          }

          > div {
            height: 100%;
            display: flex;
            align-items: center;

            > span {
              font-size: 20px;
            }
          }

          .right-element {
            text-align: right;
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  buttonRight: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  white: PropTypes.bool,
  onClick: PropTypes.func,
};

Header.defaultProps = {
  buttonRight: false,
  white: false,
  onClick: () => Router.back(),
};

export default Header;
