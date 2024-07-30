import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ScreenLoading from '../components/ScreenLoading';
import { useAuth } from '../context/useAuth';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  text-align: center;
  height: 100vh;
  background: black;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10rem;
`;

const Logo = styled.img`
  width: 225px;
  height: 90px;
  margin-left: 10px;
`;

const Tagline = styled.span`
  font-size: 12px;
  color: #fff;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 320px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  font-family: Quicksand;
  border: none;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 15px;

  &::placeholder {
    color: black;
    opacity: 1;
  }
`;

const Button = styled.button`
  width: 320px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  font-family: Quicksand;
  border: 1px solid #fff;
  background: #000;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
`;

const Login = () => {
  const { login, error: LoginError } = useAuth();
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
      setError(err || 'An error occurred. Please try again later.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ScreenLoading />;
  }

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit}>
        <LogoWrapper>
          <Logo src="/static/logo.svg" alt="baller profile logo" />
          <Tagline>Stats for recreational sports made easy!</Tagline>
        </LogoWrapper>
        <InputWrapper>
          <Input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputWrapper>
        {error || (LoginError && <Error>{error || LoginError}</Error>)}
        <InputWrapper>
          <Button type="submit">Login</Button>
        </InputWrapper>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
