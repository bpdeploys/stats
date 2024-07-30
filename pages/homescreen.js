import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 22px;
  padding-right: 30px;
  padding-left: 20px;
  background-image: url('/static/statsheader.svg');
  background-repeat: no-repeat;
  min-height: 50px;
`;

const Logo = styled.img`
  width: 100px;
  height: 48px;
`;

const LoginButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  width: 63px;
  height: 28px;
  border-radius: 5px;
  border: 2px solid white;
  color: white;
`;

const Footer = styled.div`
  img {
    width: 100%;
  }
`;

const BodyText = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 100px;
  font-size: 18px;
  margin-bottom: 100px;
`;

const Heading = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
`;

const Sports = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;

  > img {
    width: 20%;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Header>
        <Logo src="/static/referee-stats.svg" alt="" />
        <Link href="/login" passHref>
          <LoginButton>LOGIN</LoginButton>
        </Link>
      </Header>
      <BodyText>
        Use the Stats App to officiate matches,
        <br /> track stats & gain insights!
      </BodyText>
      <Heading>SPORTS YOU CAN OFFICIATE</Heading>
      <Sports>
        <img src="/static/football-hex.svg" alt="" />
        <img src="/static/basketball-hex.svg" alt="" />
        <img src="/static/Handball-hex.svg" alt="" />
      </Sports>
      <Footer>
        <img src="/static/stastbottom.svg" alt="" />
      </Footer>
    </Wrapper>
  );
};

export default Home;
