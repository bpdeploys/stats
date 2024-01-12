import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import Header from '../components/Header';
import { fetchMatchsForOfficiate, fetchGetStartingLineUp } from '../services';
import userInfoPropTypes from '../proptypes/userInfo';
import { Context, MATCH_ACTIVE_KEY } from '../provider';
import SmallLoading from '../components/SmallLoading';

const Item = ({
  team_1_name,
  team_2_name,
  ko,
  pitch_format,
  pitch_name,
  score,
  code,
  setMatchActive,
}) => {
  return (
    <div
      className="match-item --margin-top --bg"
      tabIndex={0}
      role="button"
      onKeyDown={setMatchActive}
      onClick={setMatchActive}
    >
      {score && <span className="score">{score}</span>}
      <span className="icon">
        <img src="/static/fball.png" alt="football" />
      </span>
      <div>
        <p>{team_1_name}</p>
        <p>VS</p>
        <p>{team_2_name}</p>
      </div>
      <div>
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
      <style jsx>{`
        .match-item {
          position: relative;
          background: #c4c4c4;
          border-radius: 4px;
          display: flex;
          height: 120px;

          &.--bg {
            background-image: url('/static/tinybg.png');
            background-position: center center;
            background-size: cover;
            border: #e4e4e4 1px solid;
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
            right: 6px;
            top: 15px;
            font-size: 14px;
          }

          > div {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .table {
              text-align: left;

              > p {
                font-size: 14px;
                line-height: 18px;
                color: #c4c4c4;

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
        }
      `}</style>
    </div>
  );
};

Item.propTypes = {
  team_1_name: PropTypes.string.isRequired,
  team_2_name: PropTypes.string.isRequired,
  pitch_format: PropTypes.string.isRequired,
  pitch_name: PropTypes.string.isRequired,
  ko: PropTypes.string,
  score: PropTypes.number,
  code: PropTypes.string.isRequired,
  setMatchActive: PropTypes.func.isRequired,
};

Item.defaultProps = {
  score: 0,
  ko: 'No setted',
};

const Itinerary = ({ userInfo }) => {
  const [matchs, setMatchs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [matchsEnteredCode, setMatchsEnteredCode] = React.useState([]);
  const { setActiveMatch, storage } = React.useContext(Context);

  const setMatchActive = async ({ id, code, team_1_name, team_2_name }) => {
    // Chequear si este match cliqueando tiene ya un starting line up
    // Si lo tiene no hay en entrar en el codigo mucho menos en lineup
    const startingLineUp = await fetchGetStartingLineUp(id);
    // Reutilizar logica del redirect y el setState en el context
    const setActiveMatchAndRedirect = (url) => {
      setActiveMatch(
        {
          [MATCH_ACTIVE_KEY]: {
            id,
            code,
            team_1_name,
            team_2_name,
          },
        },
        () => Router.push(url)
      );
    };
    // Si ya metio el codigo que se vaya a lineup o al match dependiendo si ya existe
    // un starting line up
    if ('id' in startingLineUp) {
      setActiveMatchAndRedirect('/match');
    } else if (matchsEnteredCode.includes(id)) {
      // Este includes funcionara cuando active el storage en
      // enter_match_code
      setActiveMatchAndRedirect('/lineup');
    } else {
      setActiveMatchAndRedirect('/enter_match_code');
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setMatchs(await fetchMatchsForOfficiate(userInfo.id));
      setLoading(false);
    };

    const getMatchWasEnteredCodeIdsFromIndexDB = async () => {
      const matchWasEnteredCode = await storage?.getAll(
        'MATCH_WAS_ENTERED_CODE'
      );
      setMatchsEnteredCode(matchWasEnteredCode.map((m) => m.idMatch));
    };

    getMatchWasEnteredCodeIdsFromIndexDB();
    fetchData();
  }, []);

  return (
    <div>
      <Header
        onClick={() => Router.replace('/real_profile')}
        buttonRight={
          <button type="button" className="button-header">
            <Link
              href={{
                pathname: '/enter_match_code',
                query: { noCode: true },
              }}
            >
              CODE
            </Link>
          </button>
        }
      />
      <div className="content-wrapper">
        {loading ? (
          <>
            <h1>Getting matches...</h1>
            <div className="hr" />
            <div className="loading-wrapper">
              <SmallLoading />
            </div>
          </>
        ) : (
          <>
            <h1>{`${matchs.length} ${
              matchs.length === 1 ? 'Match' : 'Matches'
            } `}</h1>
            <div className="hr" />
            {Array.isArray(matchs) && matchs.length
              ? matchs.map((m) => (
                  <div className="item-match" key={m.id}>
                    <Item
                      id={m.id}
                      team_1_name={m.team1.team_name}
                      team_2_name={m.team2.team_name}
                      ko={m.kick_off}
                      pitch_format={m.pitch.format_pitch}
                      pitch_name={m.pitch.name}
                      code={m.match_code}
                      setMatchActive={() =>
                        setMatchActive({ ...m, code: m.match_code })
                      }
                    />
                  </div>
                ))
              : null}
          </>
        )}
      </div>
      <style jsx>{`
        .loading-wrapper {
          display: flex;
          height: calc(100vh - 150px);
          justify-content: center;
          align-items: center;
        }

        @keyframes WinJS-updateBadge {
          from {
            transform: translateY(24px);
            opacity: 0;
          }
          to {
            transform: none;
            opacity: 1;
          }
        }

        .item-match {
          animation: WinJS-updateBadge 0.4s forwards;
        }

        .content-wrapper {
          padding: 10px;
          min-height: 100vh;
          background: black;

          h1 {
            text-align: center;
            font-weight: 400;
            font-size: 24px;
            display: block;
            margin: 10px 0;
            color: white;
          }

          .hr {
            border-top: 1px solid white;
            max-width: 100%;
            margin: 0 auto;
            margin-bottom: 10px;
          }
        }

        .button-header {
          display: flex;
          justify-content: center;
          background: black;
          align-items: center;
          font-size: 12px;
          width: 63px;
          height: 28px;
          border-radius: 5px;
          border: 2px solid white;
          a {
            text-decoration: none;
            color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default Itinerary;
