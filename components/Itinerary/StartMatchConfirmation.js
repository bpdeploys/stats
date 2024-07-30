import React from 'react';
import styled from 'styled-components';

/**
 * @typedef {Object} Team
 * @property {string} team_name
 */

/**
 * @typedef {Object} Pitch
 * @property {string} name
 * @property {string} format_pitch
 */

/**
 * @typedef {Object} Match
 * @property {Team} team1
 * @property {Team} team2
 * @property {string} kick_off
 * @property {Pitch} pitch
 */

/**
 * @typedef {Object} StartMatchConfirmationModalProps
 * @property {Function} startMatch
 * @property {Function} closeModal
 * @property {Match} match
 */

/**
 * @param {StartMatchConfirmationModalProps} props
 */
const StartMatchConfirmationModal = ({ startMatch, closeModal, match }) => {
  return (
    <StyledWrapper>
      <StyledContent>
        <div className="title">
          <h1>Are you officiating this match?</h1>
        </div>
        <div className="teams">
          <div className="team">
            <span>{match.team1.team_name}</span>
            <small>vs</small>
            <span>{match.team2.team_name}</span>
          </div>
          <div className="details">
            <span>{match.kick_off}</span>
            <span>{match.pitch.name}</span>
            <span>{match.pitch.format_pitch}</span>
          </div>
        </div>
        <div className="buttons">
          <div>
            <button type="button" className="yes" onClick={startMatch}>
              Yes
            </button>
            <button type="button" className="no" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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

const StyledContent = styled.div`
  background: #fff;
  width: 100%;
  border: 2px solid #fff;

  .title {
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
  }

  .teams {
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .details {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 10px;
      border-top: 2px solid darkgray;
    }

    .team {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      span {
        font-weight: 500;
        font-size: 25px;
      }

      small {
        font-weight: 500;
        font-size: 20px;
      }
    }
  }

  .buttons {
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

    button {
      font-size: 20px;
      color: #fff;
      padding: 10px 40px;
      border-radius: 5px;
      border: none;
      min-width: 150px;
    }
  }
`;

export default StartMatchConfirmationModal;
