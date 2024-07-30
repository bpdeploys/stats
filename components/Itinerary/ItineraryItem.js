import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} ItineraryItemProps
 * @property {string} team_1_name
 * @property {string} team_2_name
 * @property {string} ko
 * @property {string} pitch_format
 * @property {string} pitch_name
 * @property {string} score
 * @property {string} code
 * @property {function} setMatchActive
 * @property {boolean} live
 */

/**
 * @param {ItineraryItemProps} props
 */
const ItineraryItem = ({
  team_1_name,
  team_2_name,
  ko,
  pitch_format,
  pitch_name,
  score,
  code,
  setMatchActive,
  live,
}) => {
  return (
    <StyledMatchItem
      className="--margin-top --bg"
      tabIndex={0}
      onKeyDown={setMatchActive}
      onClick={setMatchActive}
    >
      {score && <span className="score">{score}</span>}
      {live && (
        <div className="icon">
          <img src="/static/live.gif" alt="football" />
        </div>
      )}
      <div className="teams">
        <p>{team_1_name}</p>
        <p>VS</p>
        <p>{team_2_name}</p>
      </div>
      <div className="details">
        <div className="table">
          <p>
            KO: <span>{ko}</span>
          </p>
          <p>
            Pitch: <span>{pitch_name}</span>
          </p>
          <p>
            Code: <span>{code}</span>
          </p>
          <p>
            Format: <span>{pitch_format}</span>
          </p>
        </div>
      </div>
    </StyledMatchItem>
  );
};

const StyledMatchItem = styled.div`
  position: relative;
  background: #c4c4c4;
  border-radius: 4px;
  display: flex;
  height: 120px;

  &.--bg {
    background: #fff;
    border: none;
  }

  &.--margin-top {
    margin-top: 10px;
  }

  .score {
    position: absolute;
    right: 5px;
    font-size: 14px;
  }

  .icon {
    position: absolute;
    top: 5px;
    right: 5px;
    img {
      width: 20px;
    }
  }

  .teams {
    width: 45%;
  }

  .details {
    width: 55%;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .table {
      text-align: left;

      > p {
        font-size: 14px;
        line-height: 18px;
        color: #000;

        &:not(:first-child) {
          margin-top: 4px;
        }

        > span {
          color: black;
          font-weight: 400;
          margin-left: 10px;
        }
      }
    }

    p {
      font-size: 14px;

      &.match-complete {
        font-weight: 600;
      }
    }
  }
`;

export default ItineraryItem;
