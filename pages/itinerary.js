import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Header from '../components/Header';
import {
  fetchMatchsForOfficiate,
  fetchGetStartingLineUp,
  setMatchReferee,
} from '../services';
import { Context, MATCH_ACTIVE_KEY } from '../provider';
import SmallLoading from '../components/SmallLoading';
import { useAuth } from '../context/useAuth';
import ItineraryItem from '../components/Itinerary/ItineraryItem';
import StartMatchConfirmationModal from '../components/Itinerary/StartMatchConfirmation';
import styled, { keyframes } from 'styled-components';
import { getTodayDateString } from '../utils/functions';

const setActiveMatchAndRedirect = async (
  setActiveMatchFunction,
  id,
  code,
  team_1_name,
  team_2_name
) => {
  try {
    const startingLineUp = await fetchGetStartingLineUp(id);
    if (startingLineUp && startingLineUp.id) {
      await setActiveMatchFunction({
        [MATCH_ACTIVE_KEY]: { id, code, team_1_name, team_2_name },
      });
      Router.push('/match');
    }
  } catch (error) {
    if (error.message === 'NotFound') {
      setActiveMatchFunction({
        [MATCH_ACTIVE_KEY]: { id, code, team_1_name, team_2_name },
      });
      Router.push('/lineup');
    } else {
      console.error('Failed to fetch starting lineup:', error);
    }
  }
};

const LoadingWrapper = styled.div`
  display: flex;
  height: calc(100vh - 150px);
  justify-content: center;
  align-items: center;
`;

const WinJSUpdateBadge = keyframes`
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
`;

const ItemMatch = styled.div`
  animation: ${WinJSUpdateBadge} 0.4s forwards;
`;

const ContentWrapper = styled.div`
  padding: 10px;
  min-height: calc(100vh - 45px);
  background: black;

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 24px;
    display: block;
    margin: 10px 0;
    color: white;
  }

  .hr {
    border-top: 1px solid white;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
  }
`;

const ButtonHeader = styled.button`
  display: flex;
  justify-content: center;
  background: black;
  align-items: center;
  font-size: 12px;
  width: 63px;
  height: 28px;
  border-radius: 5px;
  border: 2px solid white;

  a {
    text-decoration: none;
    color: white;
  }
`;

const Itinerary = () => {
  const { userInfo } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setActiveMatch } = useContext(Context);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMatches = await fetchMatchsForOfficiate(userInfo.id);
      const todayDate = getTodayDateString();
      const todaysMatches = fetchedMatches.filter(
        (match) => match.date === todayDate
      );
      setMatches(todaysMatches);
      setLoading(false);
    };
    fetchData();
  }, [userInfo.id]);

  const handleStartMatch = (match) => {
    setSelectedMatch(match);
    setIsConfirmationModalOpen(true);
  };

  const confirmStartMatch = () => {
    setMatchReferee(userInfo?.id, selectedMatch.id);
    setActiveMatchAndRedirect(
      setActiveMatch,
      selectedMatch.id,
      selectedMatch.match_code,
      selectedMatch.team1.team_name,
      selectedMatch.team2.team_name
    );
    setIsConfirmationModalOpen(false);
  };

  const closeModal = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div>
      <Header
        onClick={() => Router.replace('/real_profile')}
        buttonRight={
          <ButtonHeader type="button">
            <Link
              href={{ pathname: '/enter_match_code', query: { noCode: true } }}
            >
              CODE
            </Link>
          </ButtonHeader>
        }
      />
      <ContentWrapper>
        {loading ? (
          <LoadingSection />
        ) : (
          <MatchesSection matches={matches} onMatchSelect={handleStartMatch} />
        )}
      </ContentWrapper>
      {isConfirmationModalOpen && (
        <StartMatchConfirmationModal
          startMatch={confirmStartMatch}
          closeModal={closeModal}
          match={selectedMatch}
        />
      )}
    </div>
  );
};

const LoadingSection = () => (
  <>
    <h1>Getting matches...</h1>
    <div className="hr" />
    <LoadingWrapper>
      <SmallLoading />
    </LoadingWrapper>
  </>
);

const MatchesSection = ({ matches, onMatchSelect }) => (
  <>
    <h1>{`${matches.length} ${matches.length === 1 ? 'Match' : 'Matches'}`}</h1>
    <div className="hr" />
    {matches.map((m) => (
      <ItemMatch key={m.id}>
        <ItineraryItem
          id={m.id}
          team_1_name={m.team1.team_name}
          team_2_name={m.team2.team_name}
          ko={m.kick_off}
          pitch_format={m.pitch.format_pitch}
          pitch_name={m.pitch.name}
          code={m.match_code}
          setMatchActive={() => onMatchSelect(m)}
        />
      </ItemMatch>
    ))}
  </>
);

export default Itinerary;
