import React from 'react';
import styled from 'styled-components';
import Item from '../Item';

/**
 * Represents a list of team players.
 * @param {string} name - Name of the team.
 * @param {string} color - Color of the team.
 * @param {Array} players - List of players.
 * @param {Function} onSwitch - Callback for switching players.
 * @param {Array} playersSubs - List of substitute players.
 * @param {number} count - The current count of players.
 * @param {number} maxCount - The maximum count of players.
 * @returns {JSX.Element} TeamList component.
 */
const TeamList = ({
  name,
  color,
  players,
  onSwitch,
  playersSubs,
  count,
  maxCount,
}) => (
  <TeamListContainer>
    <TeamDetails>
      <span className="TeamName">{name}</span>
      <span className="count">
        {count}/{maxCount}
      </span>
    </TeamDetails>
    <div className="content-wrapper">
      {Array.isArray(players) &&
        players.length > 0 &&
        players.map((player) => {
          const squadNumber = player.squad_number.length
            ? player.squad_number[0].number
            : 0;

          const propsToItem = {
            color,
            onSwitch,
            number: squadNumber,
            start: !playersSubs.includes(player.id),
            key: player.id,
            id: player.id,
          };

          if (player.user && player.user.profile_pic) {
            propsToItem.img = player.user.profile_pic;
          }

          return <Item {...propsToItem} />;
        })}
    </div>
  </TeamListContainer>
);

const TeamListContainer = styled.div`
  margin-top: 10px;

  .content-wrapper {
    padding: 0 10px 0;
  }
`;

const TeamDetails = styled.div`
  width: calc(100% - 20px);
  margin: 0 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 10px 15px;

  .TeamName,
  .count {
    display: block;
    font-family: Quicksand;
    font-style: normal;
    font-weight: normal;
    font-size: 28px;
    line-height: 35px;
    color: #000;
  }
`;

export default TeamList;
