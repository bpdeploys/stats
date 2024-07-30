import React from 'react';
import Header from '../Header';
import styled from 'styled-components';

/**
 * ConfirmEndMatch component
 * @param {function} onCancel - Function to handle cancel action
 * @param {function} onConfirm - Function to handle confirm action
 * @returns {JSX.Element}
 */
const ConfirmEndMatch = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <Header name="Confirm to end the Match" onClick={onCancel} />
      <CancelWrapper>
        <Text>
          <div>
            <p>Have you finished officiating this match?</p>
            <p>Swipe to end match!</p>
          </div>
        </Text>
        <EndButton type="button" onClick={onConfirm}>
          <p>END MATCH</p>
        </EndButton>
      </CancelWrapper>
    </div>
  );
};

const CancelWrapper = styled.div`
  background: linear-gradient(200deg, #f01616, #060606);
  height: calc(100vh - 45px);
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    text-align: center;

    p {
      font-family: Quicksand;
      font-style: normal;
      font-weight: normal;
      font-size: 28px;
      line-height: 35px;
      text-align: center;
      color: #ffffff;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
`;

const EndButton = styled.button`
  height: 60px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: #d4d4d445 solid 1px;

  p {
    font-family: Quicksand;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 37px;
    text-align: center;
    color: #ffffff;
  }
`;

export default ConfirmEndMatch;
