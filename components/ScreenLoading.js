import React from 'react';
import PropTypes from 'prop-types';

/**
 * ScreenLoading
 * @param {string} height
 * @return {JSX.Element}
 **/
const ScreenLoading = ({ height = '100vh' }) => {
  return (
    <div className="ScreenLoading">
      <img src="/static/logo.png" alt="baller profile logo" />
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
      <style jsx>
        {`
          @keyframes WinJS-enterPage {
            0% {
              opacity: 0.1;
              transform: scale(0.1);
            }

            70% {
              opacity: 0.7;
              transform: scale(1.2);
            }

            82% {
              opacity: 0.5;
              transform: scale(0.8);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          img {
            width: 61px;
            position: absolute;
          }
          .lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
          }
          .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 80px;
            height: 80px;
            border: 3px solid black;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: black transparent transparent transparent;
          }
          .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
          }
          .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
            border: 4px solid grey;
            border-color: grey transparent transparent transparent;
          }
          .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
            border: 4px solid #d4d4d4;
            border-color: #d4d4d4 transparent transparent transparent;
          }
          @keyframes lds-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .ScreenLoading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: ${height};
            animation: WinJS-enterPage 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ScreenLoading;
