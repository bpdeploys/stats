import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header';
import PlayerPolygons from '../PlayerPolygons';
import SmallLoading from '../SmallLoading';
import { Context } from '../../provider';
import getName from '../../getName';
import Circle from '../Circle';

/**
 * Substitution component for managing player substitutions.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Function to close the substitution modal
 * @param {Function} props.fetchFunction - Function to fetch data
 * @param {Object} props.match - Match data
 * @param {number} props.idPlayerOffToSubs - ID of the player to substitute
 * @param {Function} props.refreshMatch - Function to refresh match data
 */
const Substitution = ({
  onClose,
  fetchFunction,
  match,
  idPlayerOffToSubs,
  refreshMatch,
}) => {
  const [loading, setLoading] = useState(false);
  const [playerOff, setPlayerOff] = useState(null);
  const [playerOn, setPlayerOn] = useState(null);
  const [team, setTeam] = useState(null);
  const context = useContext(Context);

  // For localStorage
  const KEY_TIMER_STORAGE = `MATCH_TIMER_${match.id}`;

  const onSave = async () => {
    setLoading(true);
    try {
      const parameters = {
        playerOutId: playerOff.id,
        playerInId: playerOn,
        teamId: match[`team${String(team)}`].id,
        // Por ahora esta logica setea que el out jugo todo lo que va de tiempo
        timeMatch: window.localStorage.getItem(KEY_TIMER_STORAGE),
        playerOutDuration: {
          on: '00:00', // No esta seteando el server esto
        }, // DEFINIR ESTO
        matchId: match.id,
        team1:
          team === 1
            ? [
                ...match.playingteam1
                  .map((p) => p.id)
                  .filter((id) => id !== playerOff.id),
                playerOn,
              ]
            : match.playingteam1.map((p) => p.id),
        subs1:
          team === 1
            ? [
                ...match.substeam1
                  .map((p) => p.id)
                  .filter((id) => id !== playerOn),
                playerOff.id,
              ]
            : match.substeam1.map((p) => p.id),
        team2:
          team === 2
            ? [
                ...match.playingteam2
                  .map((p) => p.id)
                  .filter((id) => id !== playerOff.id),
                playerOn,
              ]
            : match.playingteam2.map((p) => p.id),
        subs2:
          team === 2
            ? [
                ...match.substeam2
                  .map((p) => p.id)
                  .filter((id) => id !== playerOn),
                playerOff.id,
              ]
            : match.substeam2.map((p) => p.id),
      };
      const responseSave = await fetchFunction(parameters);
      if ('error' in responseSave) {
        context.showToast(responseSave.error);
      } else if ('id' in responseSave) {
        context.showToast('Substitution made');
        refreshMatch();
        onClose();
        setPlayerOn(null); // Cuidado, esto es importante
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      context.showToast('Something went wrong, try again');
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(idPlayerOffToSubs, match, fetchFunction);

    // Find the player in match.playingteam1 || playingteam2
    // To render data
    if (idPlayerOffToSubs) {
      // Buscar player setearlo y setear su team si es 1 o 2
      let player = match.playingteam1.find((p) => p.id === idPlayerOffToSubs);

      if (player) {
        setPlayerOff(player);
        setTeam(1);
      } else {
        player = match.playingteam2.find((p) => p.id === idPlayerOffToSubs);
        setPlayerOff(player);
        setTeam(2);
      }

      // eslint-disable-next-line no-console
      console.log(player);
    }
  }, [idPlayerOffToSubs]);

  let playersPolygon = [];

  if (playerOff && team) {
    playersPolygon = match[`substeam${String(team)}`].map((p) => ({
      number: p.squad_number.length ? p.squad_number[0].number : 0,
      id: p.id,
    }));
  }

  return (
    <div>
      <Header
        name="Substitution"
        buttonRight={
          <img
            src="/static/sub_icon.png"
            alt="Substitution"
            style={{ width: 27 }}
          />
        }
        onClick={() => {
          onClose();
          setPlayerOn(null); // Sumamente importante
        }}
      />
      <div className="wrapper-content">
        <div className="box">
          <div>
            <p>Player Off</p>
            {playerOff && (
              <p>
                {getName(playerOff)}
                <span>
                  {playerOff.squad_number.length
                    ? playerOff.squad_number[0].number
                    : null}
                </span>
              </p>
            )}
          </div>
          <div>
            <div>
              <Circle active={false} bgActive="#f44336" right text="INJ" />
            </div>
            <div>
              <Circle active={false} bgActive="#804db1" right text="TAC" />
            </div>
          </div>
        </div>
        <PlayerPolygons
          players={playersPolygon}
          onClick={setPlayerOn}
          activePlayer={playerOn}
        />
        <div className="button-bottom">
          {!loading ? (
            <button
              type="button"
              className="button"
              onClick={onSave}
              disabled={!playerOn}
            >
              {playerOn ? 'Select a Player' : 'SET THE ON'}
            </button>
          ) : (
            <div className="center-loading">
              <SmallLoading height="80px" />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
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

        .wrapper-content {
          min-height: calc(100vh - 45px);
          display: flex;
          flex-direction: column;
        }

        .button {
          border: none;
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
          transition: background-color 1s;

          &:disabled {
            background-color: #1362d9c2;
          }
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
                    border: 1px solid #ff0606;
                    color: #ff0606;
                  }
                }

                &:nth-child(2) {
                  > button {
                    margin-left: 10px;
                    border: 1px solid #7705ad;
                    color: #7705ad;
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

export default Substitution;
