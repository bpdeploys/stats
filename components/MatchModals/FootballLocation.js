import React from "react";
import PropTypes from "prop-types";
import Grid from "../FootballGrid/Grid";
import Header from "../Header";

const FootballLocation = ({ onNext, onClose, headerName }) => {
  const [grid, setGrid] = React.useState(null);

  return (
    <div style={{ backgroundColor: "#408C34", minHeight: "100vh" }}>
      <Header
        name={headerName}
        onClick={() => {
          onClose();
          setGrid(null);
        }}
        buttonRight={
          <button
            type="button"
            className="button-header"
            disabled={!grid}
            onClick={() => {
              const gridFocus = grid;
              onNext(gridFocus);
              setGrid(null);
            }}
          >
            {grid ? "Done" : "Select a Grid"}
            <style jsx>{`
              .button-header {
                border: none;
                padding: 5px 0 0 12px;
                border-radius: 4px;

                cursor: pointer;
                font-size: 14px;
                background: black;
                color: white;

                &.--done {
                  background: white;
                  color: black;
                }
              }
            `}</style>
          </button>
        }
      />
      <div
        className="wrapper"
        style={{ padding: "10px 0px", backgroundColor: "rgb(64, 140, 52)" }}
      >
        <Grid setGrid={setGrid} />
      </div>
    </div>
  );
};

FootballLocation.propTypes = {
  onNext: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  headerName: PropTypes.func.isRequired
};

export default FootballLocation;
