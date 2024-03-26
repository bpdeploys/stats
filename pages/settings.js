import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import userInfoPropTypes from '../proptypes/userInfo';
import { fetchUpdateUserImage, fetchUpdateUserAttrs } from '../services';
import SlotValueInput from '../components/SlotValueInput';
import ScreenLoading from '../components/ScreenLoading';
import { useAuth } from '../context/useAuth';

const Settings = () => {
  const { userInfo, logout } = useAuth();
  // Check if userInfo.user is defined
  if (!userInfo || !userInfo.user) {
    return <ScreenLoading />;
  }

  const { id, email, first_name, last_name, profile_pic, created_at, gender } =
    userInfo.user;

  const inputRef = React.useRef();
  const [image, setImage] = React.useState(profile_pic || '');

  const readURL = ({ target: { files } }) => {
    try {
      setImage(URL.createObjectURL(files[0]));
      fetchUpdateUserImage(id, files[0]);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <div className="Settings">
      <Header name="Settings" />
      <div className="wrapper-content">
        <div className="image-upload">
          <button type="button" onClick={() => inputRef.current.click()}>
            <img src={image || '/static/logo.png'} alt="baller profile logo" />
          </button>
          <input
            onChange={readURL}
            type="file"
            id="image"
            hidden
            accept="image/*"
            ref={inputRef}
          />
          <label htmlFor="image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <path id="a" d="M24 24H0V0h24v24z" />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path
                clipPath="url(#b)"
                d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"
              />
            </svg>
          </label>
        </div>
        <SlotValueInput
          title="Email"
          value={email}
          fetchFunction={(value) => {
            fetchUpdateUserAttrs(id, { email: value });
          }}
        />
        <SlotValueInput
          title="First Name"
          value={first_name}
          fetchFunction={(value) =>
            fetchUpdateUserAttrs(id, { first_name: value })
          }
        />
        <SlotValueInput
          title="Last Name"
          value={last_name}
          fetchFunction={(value) =>
            fetchUpdateUserAttrs(id, { last_name: value })
          }
        />
        <SlotValueInput
          title="Gender"
          value={gender || 'Male'}
          options={['Male', 'Female']}
          fetchFunction={(value) => fetchUpdateUserAttrs(id, { gender: value })}
        />
        <SlotValueInput title="Data Joined" value={created_at} noInput />
        <div className="logout-div">
          <button type="button" className="logout" onClick={() => logout()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        .Settings {
          background-color: lightblue;
          height: 100%;
          background-image: url('/static/default_bg.png');
          background-position: center center;
          background-size: cover;

          .logout-div {
            text-align: center;

            .logout {
              text-align: center;
              margin: 0;
              padding: 0;
              border: none;
              background: transparent;
              margin-top: 20px;

              svg {
                width: 48px;
                height: 48px;
              }
            }
          }

          .wrapper-content {
            .image-upload {
              margin: 30px auto 15px;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;

              > button {
                border: none;
                background-color: transparent;

                img {
                  cursor: pointer;
                  width: 80px;
                  height: 80px;
                  border-radius: 70px;
                }
              }

              svg {
                margin-top: 10px;
              }
            }
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
