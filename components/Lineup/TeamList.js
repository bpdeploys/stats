import React from 'react';
import Item from '../Item';

/**
 * Represents a list of team players
 * @param {Object} props
 * @param {string} props.name - Name of the team
 * @param {string} props.color - Color of the team
 * @param {Array} props.players - List of players
 * @param {Function} props.onSwitch - Callback for switching players
 * @param {Array} props.playersSubs - List of substitute players
 * @param {number} props.matchFormat - The format of the match
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
  <div className="TeamList">
    <div className="TeamDetails">
      <span className="TeamName">{name}</span>
      <span className="count">
        {count}/{maxCount}
      </span>
    </div>
    <div className="content-wrapper">
      {Array.isArray(players) &&
        players.length > 0 &&
        players.map((p) => {
          const propsToItem = {
            color,
            onSwitch,
            number: p.squad_number.length ? p.squad_number[0].number : 0,
            start: !playersSubs.includes(p.id),
            key: p.id,
            id: p.id,
          };

          if (p.user && p.user.profile_pic) {
            propsToItem.img = p.user.profile_pic;
          }

          return <Item {...propsToItem} />;
        })}
    </div>
    <style jsx>
      {`
        .TeamList {
          margin-top: 10px;

          .content-wrapper {
            padding: 0 10px 0;
          }

          .TeamDetails {
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
          }
        }
      `}
    </style>
  </div>
);

export default TeamList;
