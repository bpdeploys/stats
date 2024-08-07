import React from 'react';
import styled from 'styled-components';

/**
 * SmallLoading component for displaying a small loading spinner.
 */
const SmallLoading = () => {
  return (
    <LoadingContainer>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
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

  .lds-ring {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    animation: WinJS-enterPage 0.5s ease-in-out;
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 51px;
    height: 51px;
    margin: 6px;
    border: 6px solid #1362d9;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #1362d9 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SmallLoading;
