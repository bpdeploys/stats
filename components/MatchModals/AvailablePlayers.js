import React, { useEffect, useState } from 'react';
import Item from '../Item';
import styled from 'styled-components';

/**
 * Represents a list of available players to add to the lineup
 * @param {string} name - Name of the team
 * @param {string} color - Color of the team
 * @param {Array} availablePlayers - List of available players
 * @param {Function} onAddPlayer - Callback for adding a player to the lineup
 */
const AvailablePlayers = ({
  name,
  color,
  availablePlayers,
  onAddPlayer,
  limit,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    setSelectedPlayers([]);
  }, []);

  const handleAddPlayer = (id) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== id));
      onAddPlayer(selectedPlayers.filter((p) => p !== id));
    } else if (selectedPlayers.length < limit) {
      setSelectedPlayers([...selectedPlayers, id]);
      onAddPlayer([...selectedPlayers, id]);
    }
  };

  return (
    <AvailablePlayersContainer>
      <TeamDetails>
        <TeamName>{name} Available Players</TeamName>
        <Count>
          {selectedPlayers.length}/{limit}
        </Count>
      </TeamDetails>
      <ContentWrapper>
        {Array.isArray(availablePlayers) &&
          availablePlayers.length > 0 &&
          availablePlayers.map((p) => {
            const propsToItem = {
              color,
              number: p.number,
              onSwitch: () => handleAddPlayer(p.id),
              key: p.id,
              id: p.id,
              start: selectedPlayers?.includes(p.id),
            };

            return <Item {...propsToItem} />;
          })}
      </ContentWrapper>
    </AvailablePlayersContainer>
  );
};

const AvailablePlayersContainer = styled.div`
  margin-top: 10px;
`;

const ContentWrapper = styled.div`
  padding: 0 10px 0;
`;

const TeamDetails = styled.div`
  width: calc(100% - 20px);
  margin: 0 10px;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 10px 15px;
`;

const TeamName = styled.span`
  display: block;
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 35px;
  color: #000;
`;

const Count = styled.span``;

export default AvailablePlayers;
