import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { BASE_URL } from '../http';
import ScreenLoading from '../components/ScreenLoading';
import userInfoPropTypes from '../proptypes/userInfo';

const Login = ({ refreshAuth, userInfo }) => {
  const isDev = process.env.NODE_ENV === 'development';
  const [email, setEmail] = React.useState(
    isDev ? 'refereetest@gmail.com' : ''
  );
  const [password, setPassword] = React.useState(isDev ? 'referee1' : '');

  if ('id' in userInfo) {
    Router.push('/real_profile');
    return <ScreenLoading />;
  }
  const submitForm = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ('key' in res && 'referee' in res && res.referee.length === 1) {
          window.localStorage.setItem('TOKEN', res.key);
          refreshAuth();
          Router.replace('/real_profile');
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
      <form onSubmit={submitForm}>
        <img
          src="/static/logo.svg"
          alt="baller profile logo"
          className="logo"
        />
        <div>
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <style jsx>{`
        .Login {
          text-align: center;
          height: 100vh;
          background: black;

          form {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            div {
              width: 100%;

              input,
              button {
                width: 80%;
              }
            }
          }

          img.logo {
            width: 8rem;
            margin-bottom: 4rem;
          }

          input::-webkit-input-placeholder {
            /* Edge */
            color: black;
            opacity: 1;
          }

          input:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: black;
            opacity: 1;
          }

          input::placeholder {
            color: black;
            opacity: 1;
          }

          input {
            border: none;
            border-bottom: 1px solid #cacaca;
            height: 35px;
            padding: 0 15px;
            color: white;
            margin-bottom: 30px;
            font-size: 18px;
            line-height: 22px;
            width: 246px;
            background: black;
            outline: none;
          }

          button {
            margin-top: 1.5rem;
            border-radius: 20px;
            border: none;
            background-color: #0d2461;
            font-style: normal;
            font-weight: normal;
            font-size: 19px;
            font-family: Quicksand;
            line-height: 24px;
            text-align: center;
            color: #ffffff;
            padding: 9px 15px 9px 15px;
            width: 246px;
          }

          h1 {
            font-style: normal;
            font-weight: normal;
            font-size: 28px;
            line-height: 35px;
            text-align: center;
            color: #000000;
            margin-bottom: 81px;
          }
        }
      `}</style>
    </div>
  );
};

Login.defaultProps = {
  userInfo: {},
};

Login.propTypes = {
  refreshAuth: PropTypes.func.isRequired,
  userInfo: PropTypes.shape(userInfoPropTypes),
};

export default Login;
