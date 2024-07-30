import React from 'react';
import styled from 'styled-components';

/**
 * PlayerPolygons component
 *
 * @param {Array<{id: string, number: string}>} players - List of player objects
 * @param {number} [activePlayer=0] - The ID of the active player
 * @param {function} onClick - Function to handle click event on a player
 * @returns {JSX.Element} Rendered component
 */
const PlayerPolygons = ({ players = [], activePlayer = 0, onClick }) => {
  return (
    <PlayersContainer>
      {players.map((p) => (
        <Player
          key={p.id}
          onClick={() => onClick(p.id)}
          onKeyDown={() => onClick(p.id)}
          role="button"
          tabIndex={0}
        >
          <PlayerPolygon active={p.id === activePlayer} />
          <Overlay>
            <img src="/static/jersey.png" alt={`player ${p.number}`} />
          </Overlay>
          <Overlay>
            <span>{p.number}</span>
          </Overlay>
        </Player>
      ))}
    </PlayersContainer>
  );
};

const PlayersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
`;

const Player = styled.div`
  width: 33.333%;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const PlayerPolygon = styled.div`
  clip-path: polygon(50% 0%, 100% 47%, 82% 100%, 18% 100%, 0 49%);
  background: ${({ active }) => (active ? '#6eda42' : '#c4c4c4')};
  height: 70px;
  width: 70px;
  margin: 0 auto 40px;
  transition: all 0.2s;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 89px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 47px;
  }

  span {
    font-size: 16px;
    text-align: center;
    color: #000000;
  }
`;

export default PlayerPolygons;
