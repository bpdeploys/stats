import React from 'react';
import PropTypes from 'prop-types';

const StartMatchConfirmationModal = ({ startMatch, closeModal, match }) => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="title">
          <h1>Are you officiating this match?</h1>
        </div>
        <div className="teams">
          <div className="team">
            <span>{match.team1.team_name}</span>
            <small>vs</small>
            <span>{match.team2.team_name}</span>
          </div>
          <div className="details">
            <span>{match.kick_off}</span>
            <span>{match.pitch.name}</span>
            <span>{match.pitch.format_pitch}</span>
          </div>
        </div>
        <div className="buttons">
          <div>
            <button type="button" className="yes" onClick={startMatch}>
              Yes
            </button>
            <button type="button" className="no" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 100%;
          height: 100%;
          position: fixed;
          z-index: 100;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .content {
          background: #fff;
          width: 100%;
          border: 2px solid #fff;

          .title {
            background: #202428;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
              font-style: normal;
              font-weight: 500;
              font-size: 36px;
              color: #ffffff;
              text-align: center;
            }
          }

          .teams {
            height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .details {
              display: flex;
              justify-content: space-around;
              width: 100%;
              padding: 10px;
              border-top: 2px solid darkgray;
            }

            .team {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-top: 20px;

              span {
                font-weight: 500;
                font-size: 25px;
              }

              small {
                font-weight: 500;
                font-size: 20px;
              }
            }
          }

          .Div-3 {
            > button {
              width: 100%;
              background-color: black;
              font-family: Quicksand;
              font-style: normal;
              font-weight: normal;
              font-size: 28px;
              line-height: 35px;
              text-align: center;
              color: #ffffff;
              border: none;
              height: 60px;
            }
          }

          .buttons {
            background: #202428;
            padding: 40px 0;

            div {
              display: flex;
              justify-content: space-around;
              align-items: center;

              .yes {
                background: #36b416;
              }

              .no {
                background: #b41616;
              }
            }

            button {
              font-size: 20px;
              color: #fff;
              padding: 10px 40px;
              border-radius: 5px;
              border: none;
              min-width: 150px;
            }
          }
        }
      `}</style>
    </div>
  );
};

StartMatchConfirmationModal.propTypes = {
  startMatch: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default StartMatchConfirmationModal;
