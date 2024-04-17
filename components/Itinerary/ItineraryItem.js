import React from 'react';

const ItineraryItem = ({
  team_1_name,
  team_2_name,
  ko,
  pitch_format,
  pitch_name,
  score,
  code,
  setMatchActive,
  live,
}) => {
  return (
    <div
      className="match-item --margin-top --bg"
      tabIndex={0}
      onKeyDown={setMatchActive}
      onClick={setMatchActive}
    >
      {score && <span className="score">{score}</span>}
      {live && (
        <div className="icon">
          <img src="/static/live.gif" alt="football" />
        </div>
      )}
      <div className="teams">
        <p>{team_1_name}</p>
        <p>VS</p>
        <p>{team_2_name}</p>
      </div>
      <div className="details">
        <div className="table">
          <p>
            KO: <span>{ko}</span>
          </p>
          <p>
            Pitch: <span>{pitch_name}</span>
          </p>
          <p>
            Code: <span>{code}</span>
          </p>
          <p>
            Format: <span>{pitch_format}</span>
          </p>
        </div>
      </div>
      <style jsx>{`
        .match-item {
          position: relative;
          background: #c4c4c4;
          border-radius: 4px;
          display: flex;
          height: 120px;

          &.--bg {
            background: #fff;
            border: none;
          }

          &.--margin-top {
            margin-top: 10px;
          }

          .score {
            position: absolute;
            right: 5px;
            font-size: 14px;
          }

          .icon {
            position: absolute;
            top: 5px;
            right: 5px;
            img {
              width: 20px;
            }
          }

          .teams {
            width: 45%;
          }

          .details {
            width: 55%;
          }

          > div {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .table {
              text-align: left;

              > p {
                font-size: 14px;
                line-height: 18px;
                color: #000;

                &:not(:first-child) {
                  margin-top: 4px;
                }

                > span {
                  color: black;
                  font-weight: 400;
                  margin-left: 10px;
                }
              }
            }

            p {
              font-size: 14px;

              &.match-complete {
                font-weight: 600;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ItineraryItem;
