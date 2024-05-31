import React, { useState, useEffect } from 'react';
import Header from '../Header';
import SmallLoading from '../SmallLoading';
import { useLoading } from '../../utils/hooks/useLoading';
import AvailablePlayers from './AvailablePlayers';
import { toast } from 'react-toastify';

const UpdateLineUp = ({ onClose, match, refreshMatch, team, quantity }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [newPlayers, setNewPlayers] = useState([]);

  useEffect(() => {
    setNewPlayers([]);
  }, []);

  useEffect(() => {
    const setupAvailablePlayers = () => {
      const available = match[`substeam${team}`]?.map((p) => ({
        number: p.squad_number.length ? p.squad_number[0].number : 0,
        id: p.id,
      }));
      setAvailablePlayers(available);
    };

    setupAvailablePlayers();
  }, [team, match]);

  // const addPlayerToTeam = (player) => {
  //   if (newPlayers.length >= quantity) {
  //     // If the maximum quantity is reached, remove the first player
  //     setNewPlayers([...newPlayers.slice(1), player]);
  //   } else {
  //     // Otherwise, add the new player to the array
  //     setNewPlayers([...newPlayers, player]);
  //   }
  // };

  const onSave = async () => {
    if (newPlayers.length === 0) {
      toast.error('Please select at least one player');
    }
    // startLoading();
    // // Perform save operation (not shown in your initial code)
    // refreshMatch();
    // stopLoading();
    onClose();
  };

  console.log(newPlayers);

  return (
    <div>
      <Header
        name="Update Lineup"
        buttonRight={
          <img
            src="/static/sub_icon.png"
            alt="Substitution"
            style={{ width: 27 }}
          />
        }
        onClick={onClose}
      />
      <div className="wrapper-content">
        <div className="box">
          <AvailablePlayers
            name={match[`team${team}`]?.team_name}
            color={team === 1 ? 'red' : 'blue'}
            availablePlayers={availablePlayers}
            onAddPlayer={setNewPlayers}
            limit={quantity}
          />
        </div>
        <div className="button-bottom">
          {!isLoading ? (
            <button
              type="button"
              className="button"
              onClick={() => onSave()}
              disabled={isLoading}
            >
              SAVE
            </button>
          ) : (
            <div className="center-loading">
              <SmallLoading height="80px" />
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .center-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .button-bottom {
          flex: 1;
          display: flex;
          align-items: flex-end;
        }

        .wrapper-content {
          min-height: calc(100vh - 45px);
          display: flex;
          flex-direction: column;
        }

        .button {
          border: none;
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
          transition: background-color 1s;

          &:disabled {
            background-color: #1362d9c2;
          }
        }
      `}</style>
    </div>
  );
};

export default UpdateLineUp;
