import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="header">
          <img src="/static/referee-stats.svg" alt="" />
          <Link className="login_button" href="/login">
            LOGIN
          </Link>
        </div>
        <div className="body_text">
          Use the Stats App to officiate matches,
          <br /> track stats & gain insights!
        </div>
        <div className="heading">SPORTS YOU CAN OFFICIATE</div>
        <div className="sports">
          <img src="/static/football-hex.svg" alt="" />
          <img src="/static/basketball-hex.svg" alt="" />
          <img src="/static/Handball-hex.svg" alt="" />
        </div>
        <div className="footer">
          <img src="/static/stastbottom.svg" alt="" />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          background-color: black;
          min-height: 100vh;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 22px;
          padding-right: 30px;
          padding-left: 20px;
          background-image: url("/static/statsheader.svg");
          background-repeat: no-repeat;
          min-height: 50px;

          & img {
            width: 100px;
            height: 48px;
          }
        }

        .login_button {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          width: 63px;
          height: 28px;
          border-radius: 5px;
          border: 2px solid white;
          color: white;
        }

        .footer {
          img {
            width: 100%;
          }
        }

        .body_text {
          display: flex;
          justify-content: center;
          color: white;
          margin-top: 100px;
          font-size: 18px;
          margin-bottom: 100px;
        }

        .heading {
          color: white;
          display: flex;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 20px;
        }

        .sports {
          display: flex;
          justify-content: space-around;
          margin-bottom: 150px;

          > img {
            width: 20%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
