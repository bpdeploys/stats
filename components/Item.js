import React from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';

const Item = ({
  img,
  number,
  start,
  color,
  theme,
  match,
  onSwitch,
  id,
  onClickProfilePicture,
  onClickGoal,
  onClickFoul,
}) => (
  <div className="Item">
    <div>
      {onClickProfilePicture ? (
        <button type="button" onClick={onClickProfilePicture}>
          <img src={img} alt="profile" />
        </button>
      ) : (
        <img src={img} alt="profile" />
      )}
      <span className="number">{number}</span>
      <div className="corner" />
    </div>
    <div>
      {match ? (
        <>
          <button
            type="button"
            className="action-match first"
            onClick={onClickGoal}
          >
            <img src="/static/ballfootball.png" alt="football" />
          </button>
          <button type="button" className="action-match" onClick={onClickFoul}>
            <img src="/static/whistle.png" alt="football" />
          </button>
        </>
      ) : (
        <Switch
          width="105px"
          on={start}
          textLeft="SUB"
          textRight="START"
          color={start ? color : '#FFFFFF'}
          onClick={() => {
            onSwitch(id);
          }}
        />
      )}
    </div>

    <style jsx>{`
      .action-match {
        border: none;
        background-color: transparent;
        height: 100%;

        img {
          width: 45px;
        }

        &.first {
          margin-right: 30px;

          img {
            width: 40px;
          }
        }
      }

      .switch {
        background: #e5e5e5;
        border: 1px solid #cbcbcb;
        box-sizing: border-box;
        border-radius: 55px;
        height: 30px;
        width: 89px;
        padding: 0;
        cursor: pointer;

        .circle {
          display: inline;
          float: right;

          > svg {
            position: relative;
            top: -1px;
          }
        }

        &.--no-start {
          .circle {
            float: left;
            margin-left: 1px;
          }
        }

        span {
          padding: 0 10px;
          font-family: Quicksand;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 28px;
          color: #616060;
        }
      }

      .Item {
        background: white;
        margin-top: 10px;
        display: flex;
        height: 60px;

        > div {
          padding: 5px;

          &:nth-child(2) {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: flex-end;
            background-color: ${theme === 'default' ? 'transparent' : theme};
          }

          &:nth-child(1) {
            background-color: ${color};
            display: flex;
            align-items: center;
            position: relative;
            webkit-clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
            clip-path: polygon(0 0, 100% 0, 73% 100%, 0 100%);
            width: 350px;

            > img,
            > button > img {
              margin-left: 20px;
              width: 50px;
              height: 50px;
              background: white;
              border-radius: 50px;
            }

            > button {
              background: transparent;
              border: none;
            }

            > .number {
              color: white;
              font-size: 41px;
              display: block;
              position: absolute;
              width: 57px;
              text-align: center;
              right: 41px;
            }

            > .corner {
              display: none;
            }
          }
        }
      }
    `}</style>
  </div>
);

Item.propTypes = {
  start: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  img: PropTypes.string,
  color: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['white', 'default']),
  match: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onSwitch: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClickProfilePicture: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onClickGoal: PropTypes.func.isRequired,
  onClickFoul: PropTypes.func.isRequired,
};

Item.defaultProps = {
  img: '/static/pic.png',
  theme: 'default',
  match: false,
  onClickProfilePicture: false,
  onSwitch: false,
};

export default Item;
