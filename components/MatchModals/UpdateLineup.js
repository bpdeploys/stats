import React, { useState, useEffect } from 'react';
import Header from '../Header';
import SmallLoading from '../SmallLoading';
import { useLoading } from '../../utils/hooks/useLoading';
import AvailablePlayers from './AvailablePlayers';
import { toast } from 'react-toastify';
import { fetchUpdateLineupPlayers } from '../../services';

const UpdateLineUp = ({ onClose, match, refreshMatch, team, quantity }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
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

    const setupCurrentPlayers = () => {
      const current = match[`playingteam${team}`]?.map((p) => ({
        number: p.squad_number.length ? p.squad_number[0].number : 0,
        id: p.id,
      }));
      setCurrentPlayers(current);
    };

    setupAvailablePlayers();
    setupCurrentPlayers();
  }, [team, match]);

  const onSave = async () => {
    if (newPlayers.length === 0) {
      toast.error('Please select at least one player');
      return;
    }

    startLoading();

    const updatedPlayers = [...currentPlayers.map((p) => p.id), ...newPlayers];

    const data = {
      game_id: match.id,
      team1: team === 1 ? updatedPlayers : match.playingteam1.map((p) => p.id),
      team2: team === 2 ? updatedPlayers : match.playingteam2.map((p) => p.id),
      subs1:
        team === 1
          ? match.substeam1
              .filter((p) => !newPlayers.includes(p.id))
              .map((p) => p.id)
          : match.substeam1.map((p) => p.id),
      subs2:
        team === 2
          ? match.substeam2
              .filter((p) => !newPlayers.includes(p.id))
              .map((p) => p.id)
          : match.substeam2.map((p) => p.id),
    };

    try {
      await fetchUpdateLineupPlayers(data);
      toast.success('Lineup updated successfully');
      refreshMatch();
      onClose();
    } catch (error) {
      toast.error('Failed to update lineup');
    } finally {
      stopLoading();
    }
  };

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
