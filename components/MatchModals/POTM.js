import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import PlayerPolygons from '../PlayerPolygons';
import { setManOfTheMatch } from '../../services';
import { Context } from '../../provider';
import ScreenLoading from '../ScreenLoading';
import styled from 'styled-components';

/**
 * POTM (Player of the Match) component.
 *
 * @param {boolean} active - Indicates if the component is active
 * @param {Object} match - Match data
 * @param {number} match.id - ID of the match
 * @param {Array} match.playingteam1 - Players of team 1
 * @param {Array} match.playingteam2 - Players of team 2
 * @param {Array} match.substeam1 - Substitutes of team 1
 * @param {Array} match.substeam2 - Substitutes of team 2
 * @param {Object} match.team1 - Data of team 1
 * @param {Object} match.team2 - Data of team 2
 */
const POTM = ({ active, match }) => {
  const [POTM_ID, setPOTM] = useState(null);
  const [submmited, setSubmmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const handleSubmit = async () => {
    setLoading(true);
    setSubmmited(true);
    const response = await setManOfTheMatch({
      player_id: POTM_ID,
      game_id: match.id,
    });
    setLoading(false);

    if ('error' in response) {
      setSubmmited(false);
      context.showToast(response.error);
    } else {
      context.showToast('Job well done!');
      Router.replace('/itinerary');
    }
  };

  const mapFunc = (n) => ({
    id: n.id,
    number: n.squad_number.length ? n.squad_number[0].number : 0,
  });

  return (
    <Wrapper>
      {active && (
        <>
          {loading ? (
            <ScreenLoading />
          ) : (
            <>
              <a className="button --team">{match.team1.team_name}</a>
              <PlayerPolygons
                onClick={(id) => setPOTM(id)}
                players={[
                  ...match.playingteam1.map(mapFunc),
                  ...match.substeam1.map(mapFunc),
                ]}
                activePlayer={POTM_ID}
              />
              <a className="button --team">{match.team2.team_name}</a>
              <PlayerPolygons
                onClick={(id) => setPOTM(id)}
                players={[
                  ...match.playingteam2.map(mapFunc),
                  ...match.substeam2.map(mapFunc),
                ]}
                activePlayer={POTM_ID}
              />
              <div className="button-bottom">
                <button
                  type="button"
                  className="button"
                  onClick={handleSubmit}
                  disabled={submmited}
                >
                  DONE
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .button-bottom {
    flex: 1;
    display: flex;
    align-items: flex-end;
  }

  .wrapper-content {
    height: 100%;
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

    &.--team {
      margin-top: 15px;
    }
  }
`;

export default POTM;
