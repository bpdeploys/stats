import React from "react";
import PropTypes from "prop-types";

const GRID_WITH_COLOR_BRILLIANT = [
  "A3",
  "M6",
  "M2",
  "M3",
  "D5",
  "D6",
  "D1",
  "D2",
  "D3"
];

const PATH_S3 = "https://baller-profile.s3.amazonaws.com/pitch-grid-refapp/";

const MAP_FUNCTION = setGrid => n => (
  <div key={n}>
    <button
      type="button"
      className={GRID_WITH_COLOR_BRILLIANT.includes(n) ? "--brilliant" : ""}
      onClick={() => setGrid(n)}
    >
      <span>{n}</span>
      <img src={`${PATH_S3}${n}.png`} alt="x" />
    </button>
    <style jsx>{`
      div {
        width: 33.3333%;

        @media (max-width: 422px) {
          width: auto;
        }

        > button {
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

          &.--brilliant {
            span {
              color: #2fb73d;
            }
          }

          &:focus {
            span {
              color: white;
              font-size: 26px;
            }
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
        }
      }
    `}</style>
  </div>
);

const Grid = ({ setGrid }) => {
  return (
    <div>
      <div className="GridWrapper">
        {["A4", "A5", "A6"].map(MAP_FUNCTION(setGrid))}
      </div>
      <div className="GridWrapper">
        {["A1", "A2", "A3"].map(MAP_FUNCTION(setGrid))}
      </div>
      <div className="GridWrapper">
        {["M4", "M5", "M6"].map(MAP_FUNCTION(setGrid))}
      </div>
      <div className="GridWrapper">
        {["M1", "M2", "M3"].map(MAP_FUNCTION(setGrid))}
      </div>
      <div className="GridWrapper">
        {["D4", "D5", "D6"].map(MAP_FUNCTION(setGrid))}
      </div>
      <div className="GridWrapper">
        {["D1", "D2", "D3"].map(MAP_FUNCTION(setGrid))}
      </div>
      <style jsx>{`
        .GridWrapper {
          display: flex;
          width: calc(126px * 3);
          margin: auto;

          @media (max-width: 422px) {
            justify-content: center;
          }

          @media (max-width: calc(126px * 3)) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

Grid.propTypes = {
  setGrid: PropTypes.func.isRequired
};

export default Grid;
