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
}) => {
  return (
    <div
      className="match-item --margin-top --bg"
      tabIndex={0}
      onKeyDown={setMatchActive}
      onClick={setMatchActive}
    >
      {score && <span className="score">{score}</span>}
      <span className="icon">
        <img src="/static/fball.png" alt="football" />
      </span>
      <div>
        <p>{team_1_name}</p>
        <p>VS</p>
        <p>{team_2_name}</p>
      </div>
      <div>
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
            background-image: url('/static/tinybg.png');
            background-position: center center;
            background-size: cover;
            border: #e4e4e4 1px solid;
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
            right: 6px;
            top: 15px;
            font-size: 14px;
          }

          > div {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .table {
              text-align: left;

              > p {
                font-size: 14px;
                line-height: 18px;
                color: #c4c4c4;

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
