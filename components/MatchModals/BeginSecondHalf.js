import React from 'react';
import styled from 'styled-components';

const BeginSecondHalfModal = ({ beginHalf, closeModal }) => {
  return (
    <Wrapper>
      <Content>
        <Title>
          <h1>Begin 2nd Half?</h1>
        </Title>
        <Buttons>
          <div>
            <Button type="button" className="yes" onClick={beginHalf}>
              Yes
            </Button>
            <Button type="button" className="no" onClick={closeModal}>
              No
            </Button>
          </div>
        </Buttons>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background: #fff;
  width: 100%;
  border: 2px solid #fff;
`;

const Title = styled.div`
  background: #202428;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    color: #ffffff;
    text-align: center;
  }
`;

const Buttons = styled.div`
  background: #202428;
  padding: 40px 0;

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .yes {
      background: #36b416;
    }

    .no {
      background: #b41616;
    }
  }
`;

const Button = styled.button`
  font-size: 20px;
  color: #fff;
  padding: 10px 40px;
  border-radius: 5px;
  border: none;
  min-width: 150px;
`;

export default BeginSecondHalfModal;
