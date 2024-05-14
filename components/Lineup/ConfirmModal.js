import React, { useState } from 'react';

const ConfirmModal = ({
  open,
  onConfirm,
  onCancel,
  team1Name,
  team2Name,
  team1Count,
  team2Count,
}) => {
  const [inputValue, setInputValue] = useState('');
  const lesserCount = Math.min(team1Count, team2Count);

  const getTeamNameWithLessPlayers = () => {
    if (team1Count < team2Count) {
      return team1Name;
    } else {
      return team2Name;
    }
  };

  const handleConfirm = () => {
    if (parseInt(inputValue) === lesserCount) {
      onConfirm();
    } else {
      alert(
        'The player count does not match. Please confirm the correct number.'
      );
      setInputValue('');
    }
  };

  if (!open) return null;

  return (
    <div className="wrapper">
      <div className="content">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={onCancel}
        >
          <line
            x1="21.9204"
            y1="22.6275"
            x2="7.07113"
            y2="7.7783"
            stroke="black"
          />
          <line
            x1="7.07125"
            y1="21.9204"
            x2="21.9205"
            y2="7.07119"
            stroke="black"
          />
        </svg>

        <h2>Confirm Lineups</h2>
        <div className="teams">
          <div className="team">
            <h3>{team1Name}</h3>
            <p>{team1Count}</p>
          </div>
          <div className="team">
            <h3>{team2Name}</h3>
            <p>{team2Count}</p>
          </div>
        </div>
        <div className="confirmation">
          <p>How much players in the {getTeamNameWithLessPlayers()} lineup?</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="button">
          <button onClick={handleConfirm}>Submit Lineups</button>
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
          padding: 1.5rem 1rem;
          border: 1px solid #000;
          position: relative;
          }

          svg {
            position: absolute;
            top: 15px;
            right: 15px;
          }

          h2 {
            text-align: center;
            padding-bottom: 2rem;
          }

          .teams {
            .team {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 1rem;
              h3 {
                font-size: 25px;
              }

              p {
                font-size: 35px;
              }
            }
          }

          .confirmation {
            display: flex;
            justify-content: space-between;
  
            p {
              width: 80%;
              font-size: 20px;
            }
  
            input {
              width: 25%;
              font-size: 40px;
              text-align: center;
              font-family: Quicksand; 
            }
          }

          .button {
            width: 100%;
            text-align: center;
            margin-top: 2rem;
            
            button {
              width: 80%;
              padding: 0.5rem 0;
              font-size: 25px;
              color: #fff;
              background-color: rgba(20, 71, 199, 1);
              border: none;
              font-family: Quicksand;
              border-radius: 5px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
