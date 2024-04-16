/**
 * Renders a foul event component.
 *
 * @param {number} team - The team number
 * @param {string} booked - The booked status
 * @param {string} drewFoul - The drew foul status
 * @param {string} time - The time of the event
 * @param {function} onClick - The click event handler
 * @return {ReactElement} The rendered foul event component
 */
const FoulEvent = ({ team = 1, booked, drewFoul, time, onClick }) => (
  <div className="foulEvent" onClick={onClick}>
    <div className="details">
      <div className="detail">
        <small>Booked</small>
        <span>{booked}</span>
      </div>
      <div className="detail">
        <small>Drew Foul</small>
        <span>{drewFoul}</span>
      </div>
      <div className="detail">
        <small>Time</small>
        <span>{time}</span>
      </div>
    </div>
    <img className="icon" src="/static/foul.svg" alt="Foul" />
    <style jsx>
      {`
        .foulEvent {
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

export default FoulEvent;
