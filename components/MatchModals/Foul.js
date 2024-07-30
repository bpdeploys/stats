import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import PlayerPolygons from '../PlayerPolygons';
import { Context } from '../../provider';
import getName from '../../getName';
import Circle from '../Circle';
import { useLoading } from '../../utils/hooks/useLoading';
import SmallLoading from '../SmallLoading';
import styled from 'styled-components';

/**
 * Foul component
 * @param {function} onClose - Function to handle close action
 * @param {function} fetchFunction - Function to fetch data
 * @param {Object} match - Match data
 * @param {number} idPlayerToFoul - ID of the player to foul
 * @param {function} refreshMatch - Function to refresh match data
 * @param {string} gridFocus - Grid focus information
 * @returns {JSX.Element}
 */
const Foul = ({
  onClose,
  fetchFunction,
  match,
  idPlayerToFoul,
  refreshMatch,
  gridFocus,
}) => {
  const CAUTION_TYPE_NONE = 'None';
  const CAUTION_TYPE_YELLOW_CARD = 'Yellow Card';
  const CAUTION_TYPE_RED_CARD = 'Red Card';

  const OUTCOME_TYPE_FREE_KICK = 'Free Kick';
  const OUTCOME_TYPE_PENALTY = 'Penalty';

  const [playerFoulId, setPlayerFoulId] = useState(null);
  const [team, setTeam] = useState(null);
  const [playerFouled, setPlayerFouled] = useState(null);
  const [outCome, setOutCome] = useState(OUTCOME_TYPE_FREE_KICK);
  const [caution, setCaution] = useState(CAUTION_TYPE_NONE);
  const context = useContext(Context);
  const KEY_TIMER_STORAGE = `MATCH_TIMER_${match.id}`;
  const { isLoading, startLoading, stopLoading } = useLoading();

  const onSave = async () => {
    startLoading();
    try {
      const parameters = {
        fouled: playerFouled,
        fouler: playerFoulId,
        half: 'First Half', // TODO: Make it dynamic
        time: window.localStorage.getItem(KEY_TIMER_STORAGE),
        team: match[`team${String(team)}`].id,
        team_op: match[`team${String(team === 1 ? 2 : 1)}`].id,
        game: match.id,
        outcome: outCome,
        caution,
        status: 'On',
        location: gridFocus,
      };
      const responseSave = await fetchFunction(parameters);
      if ('error' in responseSave) {
        context.showToast(responseSave.error);
      } else if ('id' in responseSave) {
        context.showToast('Foul recorded');
        refreshMatch();
        onClose();
        setOutCome(OUTCOME_TYPE_FREE_KICK);
        setCaution(CAUTION_TYPE_NONE);
        setPlayerFouled(null);
      }
    } catch (error) {
      context.showToast('Something went wrong, try again');
    } finally {
      stopLoading();
    }
  };

  const handleFoulerChange = (e) => {
    setPlayerFoulId(parseInt(e.target.value));
  };

  useEffect(() => {
    if (idPlayerToFoul) {
      let player = match.playingteam1.find((p) => p.id === idPlayerToFoul);

      if (player) {
        setPlayerFoulId(player.id);
        setTeam(1);
      } else {
        player = match.playingteam2.find((p) => p.id === idPlayerToFoul);
        setPlayerFoulId(player.id);
        setTeam(2);
      }
    }
  }, [idPlayerToFoul]);

  const playerOptions = match[`playingteam${team}`]?.map((player) => (
    <option key={player.id} value={player.id}>
      {getName(player)} - {player.squad_number[0].number}
    </option>
  ));

  let playersPolygon = [];

  if (playerFoulId && team) {
    playersPolygon = match[`playingteam${String(team === 1 ? 2 : 1)}`].map(
      (p) => ({
        number: p.squad_number.length ? p.squad_number[0].number : 0,
        id: p.id,
      })
    );
  }

  return (
    <FoulContainer>
      <Header
        name="Foul"
        buttonRight={
          <img
            src="/static/ballfootball.png"
            alt="football"
            style={{ width: 27 }}
          />
        }
        onClick={() => {
          onClose();
          setOutCome(OUTCOME_TYPE_FREE_KICK);
          setCaution(CAUTION_TYPE_NONE);
          setPlayerFouled(null);
        }}
      />
      <div className="wrapper-content">
        <div className="box">
          <div>
            <p>Fouler</p>
            {playerFoulId && (
              <select
                value={playerFoulId}
                onChange={handleFoulerChange}
                className="player-dropdown"
              >
                {playerOptions}
              </select>
            )}
          </div>
          <div>
            <div>
              <Circle
                active={outCome === OUTCOME_TYPE_FREE_KICK}
                bgActive="#21ac0b"
                right
                text="SB"
                onClick={() => setOutCome(OUTCOME_TYPE_FREE_KICK)}
              />
            </div>
            <div>
              <Circle
                active={outCome === OUTCOME_TYPE_PENALTY}
                bgActive="#7705ad"
                right
                text="Pen"
                onClick={() => setOutCome(OUTCOME_TYPE_PENALTY)}
              />
            </div>
            <div>
              <Circle
                active={caution === CAUTION_TYPE_YELLOW_CARD}
                bgActive="#ffc107"
                right
                text="0"
                onClick={() => setCaution(CAUTION_TYPE_YELLOW_CARD)}
              />
            </div>
            <div>
              <Circle
                active={caution === CAUTION_TYPE_RED_CARD}
                bgActive="#f44336"
                text="0"
                onClick={() => setCaution(CAUTION_TYPE_RED_CARD)}
              />
            </div>
          </div>
        </div>
        <p className="asis-by-text">Player Fouled</p>
        <PlayerPolygons
          players={playersPolygon}
          onClick={setPlayerFouled}
          activePlayer={playerFouled}
        />
        {isLoading ? (
          <div className="center-loading">
            <SmallLoading height="80px" />
          </div>
        ) : (
          <button
            type="button"
            className="button"
            onClick={onSave}
            disabled={!playerFouled}
          >
            {playerFouled ? 'DONE' : 'WHO IS COMING ON?'}
          </button>
        )}
      </div>
    </FoulContainer>
  );
};

const FoulContainer = styled.div`
  .center-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .button-bottom {
    flex: 1;
    display: flex;
    align-items: flex-end;
  }

  .asis-by-text {
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #616060;
    margin-bottom: 30px;
  }

  .wrapper-content {
    height: calc(100% - 40px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  .button {
    text-align: center;
    background-color: #1362d9;
    color: white;
    font-size: 20px;
    font-weight: 200;
    display: block;
    width: 85%;
    margin: 30px auto;
    border-radius: 4px;
    text-decoration: none;
    padding: 6px 0;
  }

  .player-dropdown {
    margin-top: 1rem;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgba(191, 190, 190, 1);
    border-radius: 5px;
    font-size: 22px;
  }

  .box {
    background: #ffffff;
    border: 1px solid #000;
    box-sizing: border-box;
    border-radius: 8px;
    margin: 10px;

    > div {
      &:nth-child(1) {
        text-align: center;

        > p {
          font-weight: normal;
          font-size: 18px;
          line-height: 22px;
          color: #616060;
          margin-bottom: 15px;
          margin-top: 15px;
          position: relative;

          > span {
            float: right;
            font-weight: 400;
            font-size: 32px;
            position: absolute;
            right: 20px;
          }
        }
      }

      &:nth-child(2) {
        display: flex;
        border-top: 1px solid #e5e5e5;
        padding: 10px 0;
        justify-content: center;

        > div {
          button {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: none;
          }

          &:nth-child(1) {
            > button {
              margin-right: 10px;
              border: 1px solid #21ac0b;
              color: #21ac0b;
            }
          }

          &:nth-child(2) {
            > button {
              margin-left: 10px;
              border: 1px solid #7705ad;
              color: #7705ad;
            }
          }

          &:nth-child(3) {
            > button {
              margin-left: 20px;
              border: 1px solid #f6fb15;
              color: #f6fb15;
            }
          }

          &:nth-child(4) {
            > button {
              margin-left: 20px;
              border: 1px solid #ff0606;
              color: #ff0606;
            }
          }
        }
      }
    }
  }
`;

export default Foul;
