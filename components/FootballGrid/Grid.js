import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GRID_WITH_COLOR_BRILLIANT = [
  'A3',
  'M6',
  'M2',
  'M3',
  'D5',
  'D6',
  'D1',
  'D2',
  'D3',
];

const Button = styled.button`
  background-color: transparent;
  height: 100%;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
  line-height: 29px;
  transition: 0.2s;
  position: relative;

  @media (max-width: 422px) {
    img {
      width: 31vw;
    }
  }

  span {
    color: #1e7722;
    font-style: italic;
    font-weight: normal;
    font-size: 24px;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.--brilliant span {
    color: #2fb73d;
  }

  &:focus span {
    color: white;
    font-size: 26px;
  }

  @media (max-width: 422px) {
    span {
      font-size: 18px;
    }
  }

  @media (max-width: 320px) {
    span {
      font-size: 14px;
    }
  }
`;

const GridItem = styled.div`
  @media (max-width: 422px) {
    width: auto;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  margin: auto;

  @media (max-width: 422px) {
    justify-content: center;
  }

  @media (max-width: calc(126px * 3)) {
    width: 100%;
  }
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MAP_FUNCTION = (setGrid) => (n) =>
  (
    <GridItem key={n}>
      <Button
        type="button"
        className={GRID_WITH_COLOR_BRILLIANT.includes(n) ? '--brilliant' : ''}
        onClick={() => setGrid(n)}
      >
        <span>{n}</span>
        <img src={`/static/grid/${n}.svg`} alt={`Grid cell ${n}`} />
      </Button>
    </GridItem>
  );

const Grid = ({ setGrid }) => {
  return (
    <GridContainer>
      <GridWrapper>{['A4', 'A5', 'A6'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
      <GridWrapper>{['A1', 'A2', 'A3'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
      <GridWrapper>{['M4', 'M5', 'M6'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
      <GridWrapper>{['M1', 'M2', 'M3'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
      <GridWrapper>{['D4', 'D5', 'D6'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
      <GridWrapper>{['D1', 'D2', 'D3'].map(MAP_FUNCTION(setGrid))}</GridWrapper>
    </GridContainer>
  );
};

Grid.propTypes = {
  setGrid: PropTypes.func.isRequired,
};

export default Grid;
