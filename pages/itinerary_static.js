import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  matchsOfficiatedCounted,
  fetchMatchsForOfficiateCounted,
} from "../services";
import userInfoPropTypes from "../proptypes/userInfo";

const Login = ({ refreshAuth, userInfo }) => {
  return (
    <div>
      <div className="wrapper">
        <div className="header">
          <img src="/static/Backspace.svg" alt="" />
          <div className="login_button">CODE</div>
        </div>
        <div className="body_text">2 Matches</div>
        <div className="hr" />
        <div className="matches">
          <div className="team">
            Team 1
            <br />
            VS
            <br />
            Team 2
          </div>
          <div className="info_wrapper">
            <div className="info">
              KO:
              <br />
              Pitch:
              <br />
              Code:
            </div>
            <div className="info_secondary">
              19:30
              <br />
              Wembley
              <br />
              NKJV
            </div>
          </div>
        </div>
        <div className="matches">
          <div className="team">
            Team 1
            <br />
            VS
            <br />
            Team 2
          </div>
          <div className="info_wrapper">
            <div className="info">
              KO:
              <br />
              Pitch:
              <br />
              Code:
            </div>
            <div className="info_secondary">
              19:30
              <br />
              Wembley
              <br />
              NKJV
            </div>
          </div>
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
          align-items: flex-start;
          padding-top: 10px;
          padding-right: 10px;
          padding-left: 10px;
          min-height: 50px;
        }

        .header > img {
          width: 8vw;
        }

        .login_button {
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 12px;
          width: 63px;
          height: 28px;
          border-radius: 5px;
          border: 2px solid white;
        }

        .body_text {
          display: flex;
          justify-content: center;
          color: white;
          margin-top: 20px;
          font-size: 25px;
          margin-bottom: 10px;
        }

        .hr {
          border-top: 1px solid white;
          max-width: 90%;
          margin: 0 auto;
          margin-bottom: 10px;
        }

        .matches {
          display: flex;
          justify-content: space-around;
          max-width: 95%;
          margin: 0 auto;
          background-color: white;
          border-radius: 5px;
          padding-top: 30px;
          padding-bottom: 30px;
          margin-bottom: 10px;
        }

        .team {
          color: black;
          text-align: center;
          font-size: 17px;
        }

        .info_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .info {
          font-size: 16px;
          color: #747272;
          margin-right: 50px;
        }

        .info_secondary {
          font-size: 16px;
          color: black;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default Login;
