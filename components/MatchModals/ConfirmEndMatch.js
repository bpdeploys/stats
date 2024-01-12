import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";

const ConfirmEndMatch = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <Header name="Confirm to end the Match" onClick={onCancel} />
      <div className="cancel-wrapper">
        <div className="text">
          <div>
            <p>Have you finished officiating this match?</p>
            <p>Swipe to end match!</p>
          </div>
        </div>
        <button className="end" type="button" onClick={onConfirm}>
          <p>END MATCH</p>
        </button>
      </div>
      <style jsx>{`
        .cancel-wrapper {
          background: linear-gradient(200deg, #f01616, #060606);
          height: calc(100vh - 45px);
          display: flex;
          flex-direction: column;

          .text {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            > div {
              text-align: center;

              p {
                font-family: Quicksand;
                font-style: normal;
                font-weight: normal;
                font-size: 28px;
                line-height: 35px;
                text-align: center;
                color: #ffffff;

                &:not(:first-child) {
                  margin-top: 20px;
                }
              }
            }
          }

          .end {
            height: 60px;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            border: #d4d4d445 solid 1px;

            p {
              font-family: Quicksand;
              font-style: normal;
              font-weight: normal;
              font-size: 30px;
              line-height: 37px;
              text-align: center;
              color: #ffffff;
            }
          }
        }
      `}</style>
    </div>
  );
};

ConfirmEndMatch.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ConfirmEndMatch;
