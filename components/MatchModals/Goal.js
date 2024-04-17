import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import PlayerPolygons from '../PlayerPolygons';
import { Context } from '../../provider';
import getName from '../../getName';
import Circle from '../Circle';

const Goal = ({
  onClose,
  fetchFunction,
  match,
  idPlayerToGoal,
  refreshMatch,
  gridFocus,
}) => {
  const GOAL_TYPE_DEFAULT = 'Goal';
  const GOAL_TYPE_OWN_GOAL = 'Own Goal';
  const GOAL_TYPE_FREE_KICK = 'Free Kick';
  const GOAL_TYPE_PENALTY = 'Penalty';

  const [playerGoalId, setPlayerGoalId] = useState(null);
  const [team, setTeam] = useState(null);
  const [assistedBy, setAssistedBy] = useState(null);
  const [goalType, setGoalType] = useState(GOAL_TYPE_DEFAULT);
  const context = useContext(Context);
  // For localStorage
  const KEY_TIMER_STORAGE = `MATCH_TIMER_${match.id}`;

  const onSave = async () => {
    try {
      const parameters = {
        scorer: playerGoalId,
        team: match[`team${String(team)}`].id,
        half: 'First Half', // TODO: Hacerlo dynamic
        time: window.localStorage.getItem(KEY_TIMER_STORAGE),
        goal_type: goalType,
        location: gridFocus,
        game: match.id,
        day_time: new Date().toLocaleTimeString().substring(0, 5),
        team_op: match[`team${String(team === 1 ? 2 : 1)}`].id,
      };
      if (assistedBy) {
        parameters.assist = assistedBy;
      }
      const responseSave = await fetchFunction(parameters);
      if ('error' in responseSave) {
        context.showToast(responseSave.error);
      } else if ('id' in responseSave) {
        context.showToast('Score line updated');
        refreshMatch();
        onClose();
        setGoalType(GOAL_TYPE_DEFAULT); // Cuidado, esto es importante
        setAssistedBy(null); // Cuidado, esto es importante
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      context.showToast('Something went wrong, try again');
    }
  };

  // Function to handle the change of scorer in the dropdown
  const handleScorerChange = (e) => {
    setPlayerGoalId(parseInt(e.target.value));
  };

  useEffect(() => {
    // Find the player in match.playingteam1 || playingteam2
    // To render data
    if (idPlayerToGoal) {
      // Buscar player setearlo y setear su team si es 1 o 2
      let player = match.playingteam1.find((p) => p.id === idPlayerToGoal);

      if (player) {
        setPlayerGoalId(player.id);
        setTeam(1);
      } else {
        player = match.playingteam2.find((p) => p.id === idPlayerToGoal);
        setPlayerGoalId(player.id);
        setTeam(2);
      }
    }
  }, [idPlayerToGoal]);

  const playerOptions = match[`playingteam${team}`]?.map((player) => (
    <option key={player.id} value={player.id}>
      {getName(player)}
    </option>
  ));

  let assistPlayerList = [];

  if (playerGoalId && team) {
    assistPlayerList = match[`playingteam${String(team)}`]
      .filter((p) => p.id !== playerGoalId) // Filter out the selected player
      .map((p) => ({
        number: p.squad_number.length ? p.squad_number[0].number : 0,
        id: p.id,
      }));
  }

  return (
    <div>
      <Header
        name="Goal"
        buttonRight={
          <img
            src="/static/ballfootball.png"
            alt="football"
            style={{ width: 27 }}
          />
        }
        onClick={() => {
          onClose();
          setAssistedBy(null); // Cuidado, esto es importante
        }}
      />
      <div className="wrapper-content">
        <div className="box">
          <div>
            <p>Scorer</p>
            <select value={playerGoalId} onChange={handleScorerChange}>
              {playerOptions}
            </select>
          </div>
          <div>
            <div>
              <Circle
                active={goalType === GOAL_TYPE_OWN_GOAL}
                bgActive="#ff0606"
                right
                text="OG"
                onClick={() => setGoalType(GOAL_TYPE_OWN_GOAL)}
              />
            </div>
            <div>
              <Circle
                active={goalType === GOAL_TYPE_FREE_KICK}
                bgActive="#21ac0b"
                right
                text="FK"
                onClick={() => setGoalType(GOAL_TYPE_FREE_KICK)}
              />
            </div>
            <div>
              <Circle
                active={goalType === GOAL_TYPE_PENALTY}
                bgActive="#7705ad"
                right
                text="Pen"
                onClick={() => setGoalType(GOAL_TYPE_PENALTY)}
              />
            </div>
          </div>
        </div>
        <p className="asis-by-text">Assisted By</p>
        <PlayerPolygons
          players={assistPlayerList}
          onClick={setAssistedBy}
          activePlayer={assistedBy}
        />
        <button type="button" className="button" onClick={onSave}>
          DONE
        </button>
      </div>
      <style jsx>{`
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
          height: ${window.innerHeight - 40}px;
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

        .box {
          background: #ffffff;
          border: 1px solid #e5e5e5;
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
            }
          }
        }
      `}</style>
    </div>
  );
};

Goal.propTypes = {
  onClose: PropTypes.func.isRequired,
  fetchFunction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    playingteam1: PropTypes.any,
    playingteam2: PropTypes.any,
    substeam1: PropTypes.any,
    substeam2: PropTypes.any,
    id: PropTypes.number.isRequired,
  }).isRequired,
  idPlayerToGoal: PropTypes.number.isRequired,
  refreshMatch: PropTypes.func.isRequired,
  gridFocus: PropTypes.string.isRequired,
};

export default Goal;
