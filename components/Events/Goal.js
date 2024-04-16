/**
 * Renders a Goal Event component with details of the goal.
 *
 * @param {number} team - The team number (default: 1)
 * @param {string} shirtNumber - The shirt number of the scorer
 * @param {string} goalTime - The time of the goal
 * @param {string} goalMinute - The minute of the goal
 * @param {function} onClick - The function to call on click
 * @return {JSX.Element} React component representing the GoalEvent
 */
const GoalEvent = ({
  team = 1,
  shirtNumber,
  goalTime,
  goalMinute,
  onClick,
}) => (
  <div className="goalEvent" onClick={onClick}>
    <div className="details">
      <div className="detail">
        <small>Scorer</small>
        <span>{shirtNumber}</span>
      </div>
      <div className="detail">
        <small>Goal</small>
        <span>{goalTime}</span>
      </div>
      <div className="detail">
        <small>Time</small>
        <span>{goalMinute}</span>
      </div>
    </div>
    <img className="icon" src="/static/ball.svg" alt="football" />
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
            width: 30px;
            height: 30px;
          }
        }
      `}
    </style>
  </div>
);

export default GoalEvent;
