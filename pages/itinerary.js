import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Header from '../components/Header';
import { fetchMatchsForOfficiate, fetchGetStartingLineUp } from '../services';
import { Context, MATCH_ACTIVE_KEY } from '../provider';
import SmallLoading from '../components/SmallLoading';
import { useAuth } from '../context/useAuth';
import ItineraryItem from '../components/Itinerary/ItineraryItem';

const setActiveMatchAndRedirect = async (
  setActiveMatch,
  id,
  code,
  team_1_name,
  team_2_name,
  url,
  startingLineUp,
  matchsEnteredCode
) => {
  // If there is a starting lineup, go to match; otherwise, go to lineup or enter code
  if ('id' in startingLineUp) {
    url = '/match';
  } else if (matchsEnteredCode.includes(id)) {
    url = '/lineup';
  } else {
    url = '/enter_match_code';
  }
  setActiveMatch(
    { [MATCH_ACTIVE_KEY]: { id, code, team_1_name, team_2_name } },
    () => Router.push(url)
  );
};

const Itinerary = () => {
  const { userInfo } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchesEnteredCode, setMatchesEnteredCode] = useState([]);
  const { setActiveMatch, storage } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMatches = await fetchMatchsForOfficiate(userInfo.id);
      setMatches(fetchedMatches);
      setLoading(false);
    };

    const getMatchWasEnteredCodeIdsFromIndexDB = async () => {
      const matchWasEnteredCode = await storage?.getAll(
        'MATCH_WAS_ENTERED_CODE'
      );
      setMatchesEnteredCode(matchWasEnteredCode.map((m) => m.idMatch));
    };

    fetchData();
    getMatchWasEnteredCodeIdsFromIndexDB();
  }, [userInfo.id, storage]);

  return (
    <div>
      <Header
        onClick={() => Router.replace('/real_profile')}
        buttonRight={
          <button type="button" className="button-header">
            <Link
              href={{ pathname: '/enter_match_code', query: { noCode: true } }}
            >
              CODE
            </Link>
          </button>
        }
      />
      <div className="content-wrapper">
        {loading ? (
          <LoadingSection />
        ) : (
          <MatchesSection
            matches={matches}
            setMatchActive={setActiveMatchAndRedirect}
            setActiveMatch={setActiveMatch}
            matchesEnteredCode={matchesEnteredCode}
          />
        )}
      </div>
      <style jsx>{`
        .loading-wrapper {
          display: flex;
          height: calc(100vh - 150px);
          justify-content: center;
          align-items: center;
        }

        @keyframes WinJS-updateBadge {
          from {
            transform: translateY(24px);
            opacity: 0;
          }
          to {
            transform: none;
            opacity: 1;
          }
        }

        .item-match {
          animation: WinJS-updateBadge 0.4s forwards;
        }

        .content-wrapper {
          padding: 10px;
          min-height: 100vh;
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
        }

        .button-header {
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
        }
      `}</style>
    </div>
  );
};

const LoadingSection = () => (
  <>
    <h1>Getting matches...</h1>
    <div className="hr" />
    <div className="loading-wrapper">
      <SmallLoading />
    </div>
  </>
);

const MatchesSection = ({
  matches,
  setMatchActive,
  setActiveMatch,
  matchesEnteredCode,
}) => (
  <>
    <h1>{`${matches.length} ${matches.length === 1 ? 'Match' : 'Matches'}`}</h1>
    <div className="hr" />
    {matches.map((m) => (
      <div className="item-match" key={m.id}>
        <ItineraryItem
          id={m.id}
          team_1_name={m.team1.team_name}
          team_2_name={m.team2.team_name}
          ko={m.kick_off}
          pitch_format={m.pitch.format_pitch}
          pitch_name={m.pitch.name}
          code={m.match_code}
          setMatchActive={async () => {
            const startingLineUp = await fetchGetStartingLineUp(m.id);
            setMatchActive(
              setActiveMatch,
              m.id,
              m.match_code,
              m.team1.team_name,
              m.team2.team_name,
              '',
              startingLineUp,
              matchesEnteredCode
            );
          }}
        />
      </div>
    ))}
  </>
);

export default Itinerary;
