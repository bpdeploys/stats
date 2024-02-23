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
 */
const TeamList = ({ name, color, players, onSwitch, playersSubs }) => (
  <div className="TeamList">
    <span>{name}</span>
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

          > span {
            width: 80%;
            margin: auto;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
            display: block;
            text-align: center;
            font-family: Quicksand;
            font-style: normal;
            font-weight: normal;
            font-size: 28px;
            line-height: 35px;
            text-align: center;
            color: #616060;
          }
        }
      `}
    </style>
  </div>
);

export default TeamList;
