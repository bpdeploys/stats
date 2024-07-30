import React from 'react';
import styled from 'styled-components';
import Toggle from './Toggle';

/**
 * Item Component
 * @param {string} img - Image URL
 * @param {number} number - Player number
 * @param {boolean} start - Indicates if the player is a starter
 * @param {string} color - Background color
 * @param {'white' | 'default'} [theme='default'] - Theme color
 * @param {boolean} [match=false] - Indicates if it's a match view
 * @param {number} id - Player ID
 * @param {function} onSwitch - Function to handle switch
 * @param {function|boolean} [onClickProfilePicture=false] - Function to handle profile picture click
 * @param {function} onClickGoal - Function to handle goal click
 * @param {function} onClickFoul - Function to handle foul click
 * @returns {React.ReactElement} Rendered component
 */
const Item = ({
  img = '/static/pic.png',
  number,
  start,
  color,
  theme = 'default',
  match = false,
  onSwitch,
  id,
  onClickProfilePicture = false,
  onClickGoal,
  onClickFoul,
}) => (
  <StyledItem color={color} theme={theme}>
    <div>
      {onClickProfilePicture ? (
        <ProfileButton type="button" onClick={onClickProfilePicture}>
          <ProfileImg src={img} alt="profile" />
        </ProfileButton>
      ) : (
        <ProfileImg src={img} alt="profile" />
      )}
      <Number>{number}</Number>
      <div className="corner" />
    </div>
    <div>
      {match ? (
        <>
          <ActionButton className="action-match first" onClick={onClickGoal}>
            <img src="/static/ballfootball.png" alt="football" />
          </ActionButton>
          <ActionButton className="action-match" onClick={onClickFoul}>
            <img src="/static/whistle.png" alt="football" />
          </ActionButton>
        </>
      ) : (
        <SwitchWrapper>
          <Toggle
            checked={start}
            yesText="Start"
            noText="Sub"
            onChange={() => onSwitch(id)}
            className="team-switch"
          />
        </SwitchWrapper>
      )}
    </div>
  </StyledItem>
);

const StyledItem = styled.div`
  background: white;
  margin-top: 10px;
  display: flex;
  height: 60px;

  > div {
    padding: 5px;

    &:nth-child(2) {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: flex-end;
      background-color: ${({ theme }) =>
        theme === 'default' ? 'transparent' : theme};
    }

    &:nth-child(1) {
      background-color: ${({ color }) => color};
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

      > .corner {
        display: none;
      }
    }
  }
`;

const ProfileImg = styled.img``;

const ProfileButton = styled.button`
  height: 100%;
`;

const Number = styled.span`
  color: white;
  font-size: 41px;
  display: block;
  position: absolute;
  width: 57px;
  text-align: center;
  right: 41px;
`;

const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  height: 100%;

  img {
    width: 45px;
  }

  &.first {
    margin-right: 30px;

    img {
      width: 40px;
    }
  }
`;

const SwitchWrapper = styled.p`
  .switch {
    background: #e5e5e5;
    border: 1px solid #cbcbcb;
    box-sizing: border-box;
    border-radius: 55px;
    height: 30px;
    width: 89px;
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
`;

export default Item;
