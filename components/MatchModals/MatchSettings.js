import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Switch from '../Switch';
import ConfirmEndMatch from './ConfirmEndMatch';
import POTM from './POTM';
import { fetchEndMatch } from '../../services';

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
    <div className="MatchSettings">
      <Header name="Match Paused" onClick={onClose} />
      <div className="content-wrapper">
        <div className="item-setting">
          <div>
            <span>Resume Match</span>
          </div>
          <div className="back-icon">
            <button type="button" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  fill="white"
                  d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
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
            <Switch
              on={half}
              textLeft="1st"
              textRight="2nd"
              onClick={() => setHalf(!half)}
              color="#1362D9"
            />
          </div>
        </div>
        <div className="item-setting --with-margin-top">
          <div>
            <span>Full Time</span>
          </div>
          <div className="switch-setting">
            <Switch
              on={fullTime}
              textLeft="Start"
              textRight="End"
              onClick={() => setFullTime(!fullTime)}
              color="#1362D9"
            />
          </div>
        </div>
        <div className="item-setting --with-margin-top">
          <div>
            <span>Match Events</span>
          </div>
          <div className="back-icon">
            <button type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="item-setting --danger --with-margin-top"
          type="button"
        >
          <div>
            <span>Shoot-Out</span>
          </div>
        </button>
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

      <style jsx>{`
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

        .MatchSettings {
          min-height: 100vh;

          .content-wrapper {
            padding: 10px;
          }

          .item-setting {
            background-color: #06159b;
            padding: 10px 20px;
            display: flex;
            width: 100%;
            align-items: center;
            min-height: 72px;
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
                  height: 50px;
                  width: 50px;
                }
              }

              &.switch-setting {
                display: flex;
                align-items: center;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

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
