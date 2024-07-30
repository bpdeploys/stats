import React from 'react';
import Router from 'next/router';
import Item from '../components/Item';
import {
  fetchGetMatchActiveInfo,
  fetchStartClock,
  checkIfMatchIsRunning,
  fetchCreateSubstitution,
  fetchCreateGoal,
  fetchCreateFoul,
} from '../services';
import { MATCH_ACTIVE_KEY, Context } from '../provider';
import ScreenLoading from '../components/ScreenLoading';
import MatchSettings from '../components/MatchModals/MatchSettings';
import Substitution from '../components/MatchModals/Substitution';
import FootballLocation from '../components/MatchModals/FootballLocation';
import Goal from '../components/MatchModals/Goal';
import Foul from '../components/MatchModals/Foul';
import ModalAreYouReadyToStart from '../components/MatchModals/ModalAreYouReadyToStart';
import MissingPlayerItem from '../components/MissingPlayerItem';
import UpdateLineUp from '../components/MatchModals/UpdateLineup';

const Match = () => {
  const {
    [MATCH_ACTIVE_KEY]: { id },
    showToast,
  } = React.useContext(Context);

  // For localStorage
  const KEY_TIMER_STORAGE = `MATCH_TIMER_${id}`;
  const KEY_DATETIME_FIRST_START_MATCH = `DATETIME_FIRST_START_MATCH_${id}`;

  // Loading que evita renderizar componentes que dependen de otros datos que se setean
  // en el useEffect
  const [loading, setLoading] = React.useState(true);
  // Absolutamente todo el response del match actual para manipular players, subs y todo.
  const [match, setMatch] = React.useState(null);
  // Esta funcion es buena para condicionales adentro del JSX
  const [clockRun, setClockRun] = React.useState(false);
  // En este estado se guarda una funcion que termina el worker
  const [stopTimer, setStopTimer] = React.useState(false);
  // Estado para saber si el match ya anteriormente fue empezado
  const [matchWasRunning, setMatchWasRunning] = React.useState(false);
  // Modals:
  // Todos estos modales cuandos e abren paran el reloj y cuando se cierran lo vuelven a correr
  // - Pantalla de settings
  const [showSettings, setShowSettings] = React.useState(false);
  // - Pantalla de substituciones para hacer una substitucion
  const [showSubsScreen, setShowSubsScreen] = React.useState(false);
  // - Pantalla de grillas de futbol, Save a String 'foul' || 'goal'
  const [showGrid, setShowGrid] = React.useState(null);
  // - Pantalla para crear un gol
  const [showGoalScreen, setShowGoalScreen] = React.useState(null);
  // - Pantalla para crear una foul
  const [showFoulScreen, setShowFoulScreen] = React.useState(null);
  // - Pantalla para agregar jugadores faltantes
  const [showAddScreen, setShowAddScreen] = React.useState(null);
  // - Para saber a que team se agregara el player
  const [missingPlayerTeam, setMissingPlayerTeam] = React.useState(null);
  // - Cantidad de jugadores faltantes
  const [missingPlayerQuantity, setMissingPlayerQuantity] =
    React.useState(null);
  // - Para el modal de sub, hay que hacer focus en el user
  const [idPlayerOffToSubs, setIdPlayerOffToSubs] = React.useState(null);
  // - Para el modal de goal, hay que hacer focus en el user
  const [idPlayerToGoal, setIdPlayerToGoal] = React.useState(null);
  // - Para el modal de foul, hay que hacer focus en el user
  const [idPlayerToFoul, setIdPlayerToFoul] = React.useState(null);
  // - Para guardar la grilla en la function Next, usado en Foul y Goal
  const [gridFocus, setGridFocus] = React.useState(null);

  const tryStopTimer = () => {
    if (typeof stopTimer === 'function') {
      stopTimer();
    }
  };

  const runClock = async () => {
    // Lanzar match play start request solo si matchWasRunning es falso
    console.log(`[MATCH WAS RUNNING]: ${matchWasRunning}`);

    if (!matchWasRunning) {
      const startClockResponse = await fetchStartClock(id);
      // Hay que setear true ahora que el match empezo para que no siga entrando aca y lanzado
      // el server 400 porque ya se creo el recurso de que el match esta running
      setMatchWasRunning(true);
      window.localStorage.setItem(KEY_DATETIME_FIRST_START_MATCH, new Date());

      console.log(
        `[MATCH FIRST START RESPONSE (WHEN NO WAS STARTED)]: ${startClockResponse}`
      );
    }

    // Worker logica: WIP
    setClockRun(true);

    const workerSimpleTimer = new Worker('/static/simple-timer.js');
    const tryGetTimerInStorage = window.localStorage.getItem(KEY_TIMER_STORAGE);

    let currentTotalSeconds = 1; // Adentro del if se seteo si existe en local storage!

    if (tryGetTimerInStorage && tryGetTimerInStorage !== '00:00') {
      try {
        const [minutes, seconds] = tryGetTimerInStorage.split(':'); // Minutes and seconds
        currentTotalSeconds = Number(minutes) * 60 + Number(seconds);
      } catch (error) {
        // eslint-disable-next-line no-alert
        window.alert('El formato esta mal deberia ser MM:SS');
      }
    }

    workerSimpleTimer.postMessage({ currentTotalSeconds });

    workerSimpleTimer.onmessage = (event) => {
      // eslint-disable-next-line no-console
      console.log(`[Worker::onmessage]: ${event.data}`);
      try {
        document.getElementById('TIME').innerHTML = event.data;
      } catch (error) {
        // Cuando el servidor se recarga o no se, se sale de esta pagina y queda un onmessage lead,
        // hay que evitar el lead memory o lo que sea que pase
        // Esto es un fallback bastante interesante y experimental
        // Pero evita el problema cuando no hay nodo para el innerHTML
        if (error instanceof TypeError) {
          // eslint-disable-next-line no-console
          console.log(`[Worker::terminate()]: STOP WORKER, TURN OFF ALL STATE`);
          workerSimpleTimer.terminate();
          setClockRun(false);
          setStopTimer(false);
        }
      }
    };

    const stop = () => {
      // eslint-disable-next-line no-console
      console.log(`[Worker::terminate()]: STOP WORKER, TURN OFF ALL STATE`);
      setClockRun(false);
      setStopTimer(false);
      workerSimpleTimer.terminate();
      window.localStorage.setItem(
        KEY_TIMER_STORAGE,
        document.getElementById('TIME').childNodes[0].textContent
      );
    };

    setStopTimer(() => stop);
  };

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (!id) {
      Router.push('/itinerary');
    } else {
      const fetchData = async () => {
        const matchPlay = await checkIfMatchIsRunning(id);
        const matchActiveInfo = await fetchGetMatchActiveInfo(id);
        if ('id' in matchActiveInfo) {
          setMatch(matchActiveInfo);
          const matchWasRunningBoolean = Boolean(matchPlay.length);
          if (matchWasRunningBoolean) {
            runClock(); // Esto lo hice para que cuando se abra el match el reloj continue corriendo
          }
          setMatchWasRunning(matchWasRunningBoolean);
          setLoading(false);
        } else {
          showToast('Error in the match status');
          Router.push('/itinerary');
        }
      };

      fetchData();

      // Stop timer if exist a worker running
      return () => {
        tryStopTimer();
      };
    }
  }, []);

  const refreshMatch = async () => {
    setMatch(await fetchGetMatchActiveInfo(id));
  };

  const mapRenderPlayers = (color, array, teamNumber) => {
    // Get the required number of players from the match format
    const requiredPlayers = parseInt(match.match_format[0]);

    return (
      <>
        {array.map(({ user, playing_position, ...rest }) => (
          <Item
            color={color}
            number={rest.squad_number.length ? rest.squad_number[0].number : 0}
            start
            theme="white"
            match
            key={rest.id}
            id={rest.id}
            onClickProfilePicture={() => {
              setIdPlayerOffToSubs(rest.id);
              setShowSubsScreen(true);
              tryStopTimer();
            }}
            onClickGoal={() => {
              setIdPlayerToGoal(rest.id);
              setShowGrid('goal');
              tryStopTimer();
            }}
            onClickFoul={() => {
              setIdPlayerToFoul(rest.id);
              setShowGrid('foul');
              tryStopTimer();
            }}
            {...(user && user.profile_pic ? { img: user.profile_pic } : null)}
          />
        ))}
        {/* Add buttons for missing players */}
        {array.length < requiredPlayers &&
          [...Array(requiredPlayers - array.length)].map((_, idx) => (
            <MissingPlayerItem
              color={color}
              theme="white"
              onClick={() => {
                setMissingPlayerTeam(teamNumber);
                setMissingPlayerQuantity(requiredPlayers - array.length);
                setShowAddScreen(true);
                tryStopTimer();
              }}
            />
          ))}
      </>
    );
  };

  return (
    <div className="Match">
      {loading && <ScreenLoading height="90vh" />}

      {!loading && (
        <>
          <div className="block time-block">
            <div>
              <span className="time-top">{'1st' || '2nd'}</span>
            </div>
            <div>
              <h1 id="TIME">00:00</h1>
              <div className="circle">
                {match.match_format[0]}:{match.match_format[0]}
              </div>
            </div>
          </div>
          <div className="actions-block">
            <div>
              <button
                type="button"
                onClick={
                  // En el primer render del match el reloj lo debes correr y no pasa mas nada
                  // Pero si ya esta corriendo, Dimitri pidio que se parara y abrieron eso
                  // SettingsMatch, dos UI events a la vez
                  clockRun
                    ? () => {
                        stopTimer();
                        setShowSettings(true);
                      }
                    : runClock
                }
              >
                {stopTimer ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 6h12v12H6z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" fill="red" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                )}
              </button>
            </div>
            <div>
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
            </div>
          </div>
          <div className="block team-block">
            <div>
              <img
                className="team-img"
                src={match.team2.team_badge || '/static/logo.png'}
                alt="team 1"
              />
            </div>
            <span className="team-name">{match.team1.team_name}</span>
            <span className="team-score">
              {match.get_total_goals.team1_goals}
            </span>
          </div>
          <div className="wrap-players">
            {mapRenderPlayers('red', match.playingteam1, 1)}
          </div>
          <div className="block team-block --with-margin-top">
            <div>
              <img
                className="team-img"
                src={match.team2.team_badge || '/static/logo.png'}
                alt="team 1"
              />
            </div>
            <span className="team-name">{match.team2.team_name}</span>
            <span className="team-score">
              {match.get_total_goals.team2_goals}
            </span>
          </div>
          <div className="wrap-players">
            {mapRenderPlayers('blue', match.playingteam2, 2)}
          </div>
          <div className={`modalView ${showSettings ? '--show' : ''}`}>
            <MatchSettings
              getStartMatchDate={() =>
                window.localStorage.getItem(KEY_DATETIME_FIRST_START_MATCH)
              }
              onClose={() => {
                setShowSettings(false);
                runClock();
              }}
              match={match}
            />
          </div>
          <div className={`modalView ${showSubsScreen ? '--show' : ''}`}>
            <Substitution
              onClose={() => {
                setShowSubsScreen(false);
                runClock();
              }}
              match={match}
              fetchFunction={fetchCreateSubstitution}
              idPlayerOffToSubs={idPlayerOffToSubs}
              refreshMatch={refreshMatch}
            />
          </div>
          {showAddScreen && (
            <div className={`modalView ${showAddScreen ? '--show' : ''}`}>
              <UpdateLineUp
                onClose={() => {
                  setShowAddScreen(false);
                  runClock();
                }}
                match={match}
                refreshMatch={refreshMatch}
                team={missingPlayerTeam}
                quantity={missingPlayerQuantity}
              />
            </div>
          )}
          <div className={`modalView ${showGrid ? '--show' : ''}`}>
            <FootballLocation
              onClose={() => {
                setShowGrid(null);
                runClock();
              }}
              onNext={(grid) => {
                setGridFocus(grid);
                if (showGrid === 'goal') {
                  setShowGoalScreen(true);
                } else {
                  setShowFoulScreen(true);
                }
                setShowGrid(false);
              }}
            />
          </div>
          <div
            className={`modalView --right ${showGoalScreen ? '--show' : ''}`}
          >
            <Goal
              onClose={() => {
                setShowGoalScreen(false);
                setIdPlayerToGoal(null);
                setGridFocus(null);
                runClock();
              }}
              match={match}
              fetchFunction={fetchCreateGoal}
              idPlayerToGoal={idPlayerToGoal}
              refreshMatch={refreshMatch}
              gridFocus={gridFocus}
            />
          </div>
          <div
            className={`modalView --right ${showFoulScreen ? '--show' : ''}`}
          >
            <Foul
              onClose={() => {
                setShowFoulScreen(false);
                setIdPlayerToFoul(null);
                setGridFocus(null);
                runClock();
              }}
              match={match}
              fetchFunction={fetchCreateFoul}
              idPlayerToFoul={idPlayerToFoul}
              refreshMatch={refreshMatch}
              gridFocus={gridFocus}
            />
          </div>
          {!matchWasRunning && (
            <ModalAreYouReadyToStart startMatch={runClock} />
          )}
        </>
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
            transform: translateX(100%);
          }

          &.--show {
            transform: translateX(0);
            opacity: 1;
            overflow: auto;
          }
        }

        @keyframes WinJS-opacity-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .wrap-players {
          animation: WinJS-opacity-in 0.7s;
        }

        @keyframes WinJS-enterPage {
          from {
            opacity: 0.1;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes WinJS-showEdgeUI {
          from {
            opacity: 0.1;
            transform: scale(0.85);

            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            transform: none;
          }
        }

        .Match {
          background-color: black;
          min-height: 100vh;
          padding: 10px;

          .block {
            padding: 10px;
            background-color: white;
            border-radius: 4px;
          }

          .time-block {
            position: relative;
            margin-bottom: 10px;
            animation: WinJS-enterPage 0.5s;

            .time-top {
              font-size: 20px;
              font-weight: 600;
              position: relative;
              top: -8px;
            }

            h1 {
              text-align: center;
              font-size: 68px;
              margin: 0;
              line-height: 68px;
            }

            .circle {
              color: white;
              background-color: black;
              height: 46px;
              width: 46px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50px;
              float: right;
              position: absolute;
              right: 10px;
              top: 40%;
            }
          }

          .actions-block {
            display: flex;
            width: 100%;

            > div {
              width: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: black;
              margin-bottom: 10px;

              > button {
                border-radius: 4px;
                width: 100%;
                border: none;
                background-color: white;

                svg {
                  transition: 0.2s;
                  width: 45px;
                  height: 45px;
                }

                &:focus {
                  > svg {
                    transform: scale(1.1, 1.1);
                  }
                }
              }

              &:nth-child(1) {
                padding-right: 5px;
                animation: WinJS-showEdgeUI 0.4s;
              }

              &:nth-child(2) {
                padding-left: 5px;
                animation: WinJS-showEdgeUI 0.8s;
              }
            }
          }

          .team-block {
            display: flex;
            align-items: center;
            height: 58px;

            &.--with-margin-top {
              margin-top: 10px;
            }

            .team-img {
              margin-right: 15px;
              width: 45px;
            }

            .team-name {
              font-style: italic;
              font-weight: 500;
              font-size: 20px;
              color: #000000;
              display: block;
              flex-grow: 1;
              line-height: 25px;
            }

            .team-score {
              width: 70px;
              font-style: italic;
              font-weight: 500;
              font-size: 40px;
              color: #f01616;
              margin-right: 5px;
              text-align: right;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Match;
