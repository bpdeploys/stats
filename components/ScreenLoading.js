import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * ScreenLoading
 * @param {string} [height='100vh'] - The height of the loading screen defaults to 100vh
 */
const ScreenLoading = ({ height = '100vh' }) => {
  return (
    <ScreenLoadingContainer height={height}>
      <Logo src="/static/logo.png" alt="baller profile logo" />
      <Loader>
        <Ring />
        <Ring />
        <Ring />
        <Ring />
      </Loader>
    </ScreenLoadingContainer>
  );
};

const enterPage = keyframes`
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
`;

const ringAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const ScreenLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height};
  animation: ${enterPage} 0.5s ease-in-out;
`;

const Logo = styled.img`
  width: 61px;
  position: absolute;
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Ring = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid black;
  border-radius: 50%;
  animation: ${ringAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: black transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
    border: 4px solid grey;
    border-color: grey transparent transparent transparent;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
    border: 4px solid #d4d4d4;
    border-color: #d4d4d4 transparent transparent transparent;
  }
`;

export default ScreenLoading;
