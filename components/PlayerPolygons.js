import React from "react";
import PropTypes from "prop-types";

const PlayerPolygons = ({ players, activePlayer, onClick }) => {
  return (
    <div className="players">
      {players.map(p => (
        <div
          key={p.id}
          onClick={() => onClick(p.id)}
          onKeyDown={() => onClick(p.id)}
          role="button"
          tabIndex={0}
        >
          <div className={`poly ${p.id === activePlayer}`} />
          <div className="overlay">
            <img src="/static/jersey.png" alt={`player ${p.number}`} />
          </div>
          <div className="overlay">
            <span>{p.number}</span>
          </div>
        </div>
      ))}
      <style jsx>{`
        .players {
          display: flex;
          flex-wrap: wrap;
          padding: 10px;
          justify-content: center;

          > div {
            width: 33.333%;
            position: relative;

            > .overlay {
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
            }

            > div.poly {
              clip-path: polygon(50% 0%, 100% 47%, 82% 100%, 18% 100%, 0 49%);
              background: #c4c4c4;
              height: 70px;
              width: 70px;
              margin: 0 auto 40px;
              transition: all 0.2s;

              &.true {
                background: #6eda42;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

PlayerPolygons.defaultProps = {
  players: [],
  activePlayer: 0
};

PlayerPolygons.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    }).isRequired
  ),
  onClick: PropTypes.func.isRequired,
  activePlayer: PropTypes.number
};

export default PlayerPolygons;
