import React from 'react';
import Header from '../Header';
import Grid from '../FootballGrid/Grid';
import styled from 'styled-components';

/**
 * FootballLocation component
 * @param {function} onNext - Function to handle next action
 * @param {function} onClose - Function to handle close action
 * @param {string} headerName - Header name to display
 * @returns {JSX.Element}
 */
const FootballLocation = ({ onNext, onClose, headerName }) => {
  const [grid, setGrid] = React.useState(null);

  return (
    <div style={{ backgroundColor: '#408C34', minHeight: '100vh' }}>
      <Header
        name={headerName}
        onClick={() => {
          onClose();
          setGrid(null);
        }}
        buttonRight={
          <ButtonHeader
            type="button"
            disabled={!grid}
            onClick={() => {
              const gridFocus = grid;
              onNext(gridFocus);
              setGrid(null);
            }}
          >
            {grid ? 'Done' : 'Select a Grid'}
          </ButtonHeader>
        }
      />
      <Wrapper>
        <Grid setGrid={setGrid} />
      </Wrapper>
    </div>
  );
};

const ButtonHeader = styled.button`
  border: none;
  padding: 5px 0 0 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background: black;
  color: white;
`;

const Wrapper = styled.div`
  padding: 10px 0;
  background-color: rgb(64, 140, 52);
`;

export default FootballLocation;
