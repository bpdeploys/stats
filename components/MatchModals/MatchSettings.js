import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import ConfirmEndMatch from './ConfirmEndMatch';
import POTM from './POTM';
import { fetchEndMatch } from '../../services';
import Toggle from '../Toggle';
import BeginSecondHalfModal from './BeginSecondHalf';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const formatMatchTimeStart = (date) => {
  return `${date.getFullYear().toString().padStart(4, '0')}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

const formatMatchTimeFinish = (minAndSecs) => {
  return minAndSecs;
};

const MatchSettings = ({ onClose, match, getStartMatchDate }) => {
  const [half, setHalf] = useState(false);
  const [fullTime, setFullTime] = useState(false);
  const [openPOM, setOpenPOM] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const toggleHalf = () => {
    setOpenModal(true);
  };

  const beginSecondHalf = () => {
    setHalf(true);
    setOpenModal(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const endMatch = () => {
    const dataForEndMatch = {
      game_id: match.id,
      match_time_finish: formatMatchTimeFinish(
        window.localStorage.getItem(`MATCH_TIMER_${match.id}`)
      ),
      match_time_start: formatMatchTimeStart(new Date(getStartMatchDate())), // Local Storage Get Item
      match_time_finish_date: new Date(),
      league_id: match.league.id,
      team_1_players: [
        ...match.playingteam1.map((n) => n.id),
        ...match.substeam1.map((n) => n.id),
      ],
      team_1_id: match.team1.id,
      team_2_players: [
        ...match.playingteam2.map((n) => n.id),
        ...match.substeam2.map((n) => n.id),
      ],
      team_2_id: match.team2.id,
    };
    fetchEndMatch(dataForEndMatch); // No se si sirve, pero tengo un bug con el relog, se setea 00:00 cuando empieza..
    setFullTime(false);
    setOpenPOM(true);
  };
  return (
    <StyledMatchSettings>
      <Header name="Match Paused" onClick={onClose} />
      <div className="content-wrapper">
        <div className="item-setting" onClick={onClose}>
          <div>
            <span>Resume Match</span>
          </div>
          <div className="back-icon">
            <button type="button">
              <svg
                width="34"
                height="27"
                viewBox="0 0 34 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="-1"
                  x2="32.2445"
                  y2="-1"
                  transform="matrix(-1 0 0 1 33.0255 14.7482)"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  y1="-1"
                  x2="17.1971"
                  y2="-1"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 14.2163 2)"
                  stroke="white"
                  strokeWidth="2"
                />
                <line
                  y1="-1"
                  x2="17.1971"
                  y2="-1"
                  transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 12.1857 26.4215)"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="item-setting --with-margin-top">
          <div>
            <span>Half</span>
          </div>
          <div className="switch-setting">
            <Toggle
              checked={half}
              yesText="2nd"
              noText="1st"
              onChange={() => toggleHalf()}
            />
          </div>
        </div>
        <div className="item-setting --with-margin-top">
          <div>
            <span>Full Time</span>
          </div>
          <div className="switch-setting">
            <Toggle
              checked={fullTime}
              yesText="End"
              noText="Start"
              onChange={() => setFullTime(!fullTime)}
            />
          </div>
        </div>
        <div
          className="item-setting --with-margin-top"
          onClick={() => router.push('/edit_events')}
        >
          <div>
            <span>Edit Match Events</span>
          </div>
          <div className="back-icon">
            <button type="button">
              <svg
                width="40"
                height="22"
                viewBox="0 0 40 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="-0.00622559"
                  y1="2"
                  x2="39.9938"
                  y2="2"
                  stroke="white"
                  strokeWidth="3"
                />
                <line
                  x1="-0.00622559"
                  y1="11"
                  x2="39.9938"
                  y2="11"
                  stroke="white"
                  strokeWidth="3"
                />
                <line
                  x1="-0.00622559"
                  y1="20"
                  x2="39.9938"
                  y2="20"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`modalView ${fullTime ? '--show' : ''}`}>
        <ConfirmEndMatch
          onConfirm={endMatch}
          onCancel={() => setFullTime(false)}
        />
      </div>
      {match && (
        <div className={`modalView --right ${openPOM ? '--show' : ''}`}>
          <POTM match={match} active={openPOM} />
        </div>
      )}
      {openModal && (
        <BeginSecondHalfModal
          beginHalf={beginSecondHalf}
          closeModal={closeModal}
          isOpen={openModal}
        />
      )}
    </StyledMatchSettings>
  );
};

const StyledMatchSettings = styled.div`
  min-height: 100vh;

  .content-wrapper {
    padding: 10px;
  }

  .item-setting {
    background-color: #1447c7;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    min-height: 62px;
    border: none;

    &.--with-margin-top {
      margin-top: 10px;
    }

    &.--danger {
      background-color: #e5e5e5;
    }

    > div {
      &:nth-child(1) {
        width: 70%;
        display: flex;
        align-items: center;

        > span {
          font-style: normal;
          font-weight: normal;
          font-size: 25px;
          color: white;
        }
      }

      &:nth-child(2) {
        button {
          border: none;
          background: transparent;
          height: 100%;
        }

        svg {
          height: 40px;
          width: 40px;
        }
      }

      &.switch-setting {
        display: flex;
        align-items: center;
      }
    }
  }

  .modalView {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    min-height: 100vh;
    background: white;
    transform: translateX(-100%);
    transition: all 0.2s ease-out;
    opacity: 0;

    &.--right {
      transition: all 0.4s ease-out;
      transform: translateX(200%);
    }

    &.--show {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

MatchSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
  match: PropTypes.shape({
    id: PropTypes.number.isRequired,
    playingteam1: PropTypes.any,
    playingteam2: PropTypes.any,
    substeam1: PropTypes.any,
    substeam2: PropTypes.any,
    team1: PropTypes.any,
    team2: PropTypes.any,
    league: PropTypes.any,
  }).isRequired,
  getStartMatchDate: PropTypes.func.isRequired,
};

export default MatchSettings;
