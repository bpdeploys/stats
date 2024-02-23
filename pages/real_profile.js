import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  matchsOfficiatedCounted,
  fetchMatchsForOfficiateCounted,
} from '../services';
import userInfoPropTypes from '../proptypes/userInfo';
import ScreenLoading from '../components/ScreenLoading';
import { useAuth } from '../context/useAuth';

const RealProfile = () => {
  const { userInfo } = useAuth();
  const [matchesOfficiated, setMatchesOfficiated] = React.useState(0);
  const [matchesForOfficiate, setMatchesForOfficiate] = React.useState(0);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      const fetchData = async () => {
        setMatchesOfficiated(await matchsOfficiatedCounted(userInfo.id));
        setMatchesForOfficiate(
          await fetchMatchsForOfficiateCounted(userInfo.id)
        );
      };

      fetchData();
    }
  }, [userInfo]);

  // Check if userInfo and userInfo.user are defined
  if (!userInfo || !userInfo.user) {
    return <ScreenLoading />;
  }

  return (
    <div className="RealProfile">
      <div className="header">
        <Link href="/settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path fill="none" d="M0 0h20v20H0V0z" />
            <path
              fill="white"
              d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"
            />
          </svg>
        </Link>
        <div className="top-component">
          <img
            src={userInfo.user.profile_pic || '/static/logo.png'}
            alt="baller profile logo"
          />
          <h1>{`${userInfo.user.first_name} ${userInfo.user.last_name}`}</h1>
          <p>Joined: {userInfo.user.created_at}</p>
        </div>
      </div>
      <div className="center-component">
        <div className="block">
          <span>{matchesOfficiated}</span>
          <div>
            <p>Games</p>
            <p>Officiated</p>
          </div>
        </div>
        <div className="marketplace">
          <a href="#">View marketplace</a>
        </div>
      </div>
      <div className="bottom-component">
        <Link href="/itinerary">{matchesForOfficiate} matches</Link>
      </div>
      <style jsx>{`
        .RealProfile {
          svg {
            position: absolute;
            right: 8px;
            top: 8px;
            height: 25px;
            width: 25px;
          }
          height: 100vh;
          background-position: center center;
          background-size: cover;
          background: black;

          .bottom-component {
            margin: 50px 0;
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            a {
              border-radius: 25px;
              border: none;
              background-color: #0d2461;
              font-style: normal;
              font-weight: bold;
              font-size: 20px;
              font-family: Quicksand;
              line-height: 24px;
              text-align: center;
              color: #ffffff;
              padding: 12px 17px 12px 17px;
              width: 80%;
              text-decoration: none;
            }
          }

          .center-component {
            text-align: center;
            margin-top: 5vh;

            .marketplace {
              a {
                border-radius: 25px;
                border: 1px solid white;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                font-family: Quicksand;
                line-height: 24px;
                text-align: center;
                color: #ffffff;
                padding: 3px 8px;
                width: 80%;
                text-decoration: none;
              }
            }

            .block {
              display: flex;
              align-items: center;
              justify-content: center;
              span,
              p {
                color: white;
              }
              div {
                display: flex;
                flex-direction: column;
                align-items: baseline;
                margin-left: 0.5rem;
              }
              margin-top: 50px;
              &:first-child {
                font-size: 60px;
              }
              p {
                font-size: 14px;
              }
            }
          }

          .top-component {
            text-align: center;
            padding-top: 30px;
            width: 100vw;

            img {
              width: 100px;
              margin-bottom: 10px;
            }

            h1 {
              font-size: 22px;
            }

            p {
              font-size: 11px;
            }

            h1,
            p {
              color: white;
              font-weight: 200;
            }
          }
        }

        .top-component::after {
          content: '';
          display: block;
          color: white;
          height: 245px;
          width: 100%;
          background-image: url(/static/profile-divider.svg);
          background-repeat: no-repeat;
          background-size: auto;
        }
      `}</style>
    </div>
  );
};

RealProfile.propTypes = {
  userInfo: PropTypes.shape(userInfoPropTypes).isRequired,
};

export default RealProfile;
