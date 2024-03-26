import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ScreenLoading from '../components/ScreenLoading';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const isDev = process.env.NODE_ENV === 'development';
  const [email, setEmail] = useState(isDev ? 'pandalast89@bp.com' : '');
  const [password, setPassword] = useState(isDev ? 'O68DrnM8' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      router.replace('/real_profile');
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div className="logoWrapper">
          <img
            src="/static/logo.svg"
            alt="baller profile logo"
            className="logo"
          />
          <span>Stats for recreational sports made easy!</span>
        </div>
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
        {error && <p className="error">{error}</p>}
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

            .logoWrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              margin-bottom: 10rem;

              img {
                width: 225px;
                height: 90px;
                margin-left: 10px;
              }

              span {
                font-size: 12px;
                color: #fff;
              }
            }

            div {
              width: 100%;

              input,
              button {
                width: 320px;
                height: 40px;
                border-radius: 5px;
                outline: none;
                font-family: Quicksand;
              }

              input {
                border: none;
                padding: 0 10px;
                margin-bottom: 10px;
                font-size: 15px;
              }

              button {
                border: 1px solid #fff;
                background: #000;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
              }
            }
          }

          input::placeholder {
            color: black;
            opacity: 1;
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

export default Login;
