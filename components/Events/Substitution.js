/**
 * Renders a Substitution Event component with details of the substitution.
 *
 * @param {number} team - The team number (default: 1)
 * @param {string} playerOn - The player coming on
 * @param {string} playerOff - The player going off
 * @param {string} time - The time of the substitution
 * @param {function} onClick - The function to call on click
 * @return {JSX.Element} React component representing the SubstitutionEvent
 */
const SubstitutionEvent = ({
  team = 1,
  playerOn,
  playerOff,
  time,
  onClick,
}) => (
  <div className="goalEvent" onClick={onClick}>
    <div className="details">
      <div className="detail">
        <small>Player On</small>
        <span>{'10' || playerOn}</span>
      </div>
      <div className="detail">
        <small>Player Off</small>
        <span>{'2nd' || playerOff}</span>
      </div>
      <div className="detail">
        <small>Time</small>
        <span>{'25:07' || time}</span>
      </div>
    </div>
    <img className="icon" src="/static/substitution.svg" alt="Substitution" />
    <style jsx>
      {`
        .goalEvent {
          height: 60px;
          background-color: ${team === 1 ? '#1447C7' : '#C71414'};
          border: none;
          margin: none;
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 96%;

          h4,
          span {
            font-size: 25px;
            color: #fff;
          }

          small {
            font-size: 12px;
            color: #bfbebe;
          }

          .details {
            width: 70%;
            display: flex;
            justify-content: space-between;

            .detail {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              width: 70px;
            }
          }

          .icon {
            width: 40px;
            height: 30px;
          }
        }
      `}
    </style>
  </div>
);

export default SubstitutionEvent;
