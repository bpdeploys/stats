import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import PlayerPolygons from '../PlayerPolygons';
import { Context } from '../../provider';
import getName from '../../getName';
import Circle from '../Circle';

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

  const [playerFoul, setPlayerFoul] = React.useState(null);
  const [team, setTeam] = React.useState(null);
  const [playerFouled, setPlayerFouled] = React.useState(null);
  const [outCome, setOutCome] = React.useState(OUTCOME_TYPE_FREE_KICK);
  const [caution, setCation] = React.useState(CAUTION_TYPE_NONE);
  const context = React.useContext(Context);
  // For localStorage
  const KEY_TIMER_STORAGE = `MATCH_TIMER_${match.id}`;

  // window.fetch("http://localhost:8000/api/fouls/6").then(res => res.json());

  const onSave = async () => {
    try {
      const parameters = {
        fouled: playerFouled,
        fouler: playerFoul.id,
        half: 'First Half', // TODO: Hacerlo dynamic
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
        setOutCome(OUTCOME_TYPE_FREE_KICK); // Cuidado, esto es importante
        setCation(CAUTION_TYPE_NONE); // Cuidado, esto es importante
        setPlayerFouled(null); // Cuidado, esto es importante
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      context.showToast('Something went wrong, try again');
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(idPlayerToFoul, match, fetchFunction);

    // Find the player in match.playingteam1 || playingteam2
    // To render data
    if (idPlayerToFoul) {
      // Buscar player setearlo y setear su team si es 1 o 2
      let player = match.playingteam1.find((p) => p.id === idPlayerToFoul);

      if (player) {
        setPlayerFoul(player);
        setTeam(1);
      } else {
        player = match.playingteam2.find((p) => p.id === idPlayerToFoul);
        setPlayerFoul(player);
        setTeam(2);
      }

      // eslint-disable-next-line no-console
      console.log(player);
    }
  }, [idPlayerToFoul]);

  let playersPolygon = [];

  if (playerFoul && team) {
    playersPolygon = match[`playingteam${String(team === 1 ? 2 : 1)}`].map(
      (p) => ({
        number: p.squad_number.length ? p.squad_number[0].number : 0,
        id: p.id,
      })
    );
  }

  return (
    <div>
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
          setOutCome(OUTCOME_TYPE_FREE_KICK); // Cuidado, esto es importante
          setCation(CAUTION_TYPE_NONE); // Cuidado, esto es importante
          setPlayerFouled(null); // Cuidado, esto es importante
        }}
      />
      <div className="wrapper-content">
        <div className="box">
          <div>
            <p>Fouler</p>
            {playerFoul && (
              <p>
                {getName(playerFoul)}
                <span>
                  {playerFoul.squad_number.length
                    ? playerFoul.squad_number[0].number
                    : null}
                </span>
              </p>
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
                onClick={() => setCation(CAUTION_TYPE_YELLOW_CARD)}
              />
            </div>
            <div>
              <Circle
                active={caution === CAUTION_TYPE_RED_CARD}
                bgActive="#f44336"
                text="0"
                onClick={() => setCation(CAUTION_TYPE_RED_CARD)}
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
        <button
          type="button"
          className="button"
          onClick={onSave}
          disabled={!playerFouled}
        >
          {playerFouled ? 'DONE' : 'WHO IS COMING ON?'}
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
      `}</style>
    </div>
  );
};

Foul.propTypes = {
  onClose: PropTypes.func.isRequired,
  fetchFunction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    playingteam1: PropTypes.any,
    playingteam2: PropTypes.any,
    substeam1: PropTypes.any,
    substeam2: PropTypes.any,
    id: PropTypes.number.isRequired,
  }).isRequired,
  idPlayerToFoul: PropTypes.number.isRequired,
  refreshMatch: PropTypes.func.isRequired,
  gridFocus: PropTypes.string.isRequired,
};

export default Foul;
