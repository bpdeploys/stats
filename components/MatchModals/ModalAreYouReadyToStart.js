import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ModalAreYouReadyToStart = ({ startMatch }) => {
  return (
    <div className="ModalAreYouReadyToStart">
      <div className="ModalAreYouReadyToStart-Content">
        <div className="Div-1">
          <h1>Kick-Off!</h1>
        </div>
        <div className="Div-2">
          <p>
            Are you ready to start
            <br />
            the Match?
          </p>
        </div>
        <div className="Div-3">
          <button type="button" onClick={startMatch}>
            Start Match
          </button>
        </div>
        <div className="Div-4">
          <div>
            <Link href="/itinerary">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
                </svg>
                Back to Itinerary
              </span>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ModalAreYouReadyToStart {
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

        .ModalAreYouReadyToStart-Content {
          background: #1362d9;
          width: 100%;
          max-width: 338px;
          width: 86%;

          .Div-1 {
            background: #06159b;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
              font-family: Quicksand;
              font-style: normal;
              font-weight: 500;
              font-size: 24px;
              line-height: 35px;
              color: #ffffff;
            }
          }

          .Div-2 {
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;

            p {
              font-family: Quicksand;
              font-style: normal;
              font-weight: normal;
              font-size: 28px;
              line-height: 35px;
              color: #ffffff;
              text-align: center;
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

          .Div-4 {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 16px 0;

            > div {
              padding: 10px;
              background: transparent;
              border-color: #c4c4c4;
              border-style: solid;
              border-width: 1px;
              border-radius: 4px;

              span {
                font-family: Quicksand;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                line-height: 22px;
                text-align: center;
                color: #c4c4c4;

                > svg {
                  vertical-align: -6px;
                  margin-right: 7px;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

ModalAreYouReadyToStart.propTypes = {
  startMatch: PropTypes.func.isRequired
};

export default ModalAreYouReadyToStart;
