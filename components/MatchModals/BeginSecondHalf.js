const BeginSecondHalfModal = ({ beginHalf, closeModal }) => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="title">
          <h1>Begin 2nd Half?</h1>
        </div>
        <div className="buttons">
          <div>
            <button type="button" className="yes" onClick={beginHalf}>
              Yes
            </button>
            <button type="button" className="no" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrapper {
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

        .content {
          background: #fff;
          width: 100%;
          border: 2px solid #fff;

          .title {
            background: #202428;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            h1 {
              font-style: normal;
              font-weight: 500;
              font-size: 36px;
              color: #ffffff;
              text-align: center;
            }
          }

          .buttons {
            background: #202428;
            padding: 40px 0;

            div {
              display: flex;
              justify-content: space-around;
              align-items: center;

              .yes {
                background: #36b416;
              }

              .no {
                background: #b41616;
              }
            }

            button {
              font-size: 20px;
              color: #fff;
              padding: 10px 40px;
              border-radius: 5px;
              border: none;
              min-width: 150px;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default BeginSecondHalfModal;
