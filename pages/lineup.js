import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import { Context, MATCH_ACTIVE_KEY } from '../provider';
import {
  fetchTeamList,
  fetchCreateStartingLineUp,
  fetchCreatePlayersStartMatch,
} from '../services';
import ScreenLoading from '../components/ScreenLoading';
import TeamList from '../components/Lineup/TeamList';
import ConfirmModal from '../components/Lineup/ConfirmModal';

const LineUp = () => {
  const {
    [MATCH_ACTIVE_KEY]: { id: idMatch },
    showToast,
  } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [teamList, setTeamList] = useState(null);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [subTeam1, setSubTeam1] = useState([]);
  const [subTeam2, setSubTeam2] = useState([]);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [showConfirmationModal, setShowConfirmationModa] = useState(false);

  const handleSwitchTeam = (team, setTeam, subTeam, setSubTeam, player) => {
    if (team.includes(player)) {
      setSubTeam([...subTeam, player]);
      setTeam(team.filter((id) => id !== player));
    } else {
      setTeam([...team, player]);
      setSubTeam(subTeam.filter((id) => id !== player));
    }
  };

  const maxStarPlayers = Number(teamList?.match_id?.match_format[0]);

  const handleSubmit = async () => {
    let minPlayers =
      maxStarPlayers - (teamList.match_id.match_format === '5v5' ? 1 : 2);

    if (
      (team1.length === maxStarPlayers && team2.length === maxStarPlayers) ||
      userConfirmed
    ) {
      setLoading(true);
      const responseCreation = await fetchCreateStartingLineUp({
        team1,
        team2,
        subs1: subTeam1,
        subs2: subTeam2,
        game_id: idMatch,
      });

      await fetchCreatePlayersStartMatch(
        [...team1, ...team2, ...subTeam1, ...subTeam2],
        idMatch
      );
      setLoading(false);

      if ('id' in responseCreation) {
        showToast('Starting Line created');
        Router.push('/match');
      } else {
        showToast('Something went wrong');
      }
    } else if (
      team1.length >= minPlayers &&
      team2.length >= minPlayers &&
      Math.abs(team1.length - team2.length) <= 2
    ) {
      setShowConfirmationModa(true); // Show modal to get confirmation
    } else {
      showToast(
        `You must choose at least ${minPlayers} players in each team and no more than ${maxStarPlayers}`
      );
    }
  };

  useEffect(() => {
    setUserConfirmed(false);
  }, [team1.length, team2.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTeamList = await fetchTeamList(idMatch);
        setSubTeam1(responseTeamList.team1.players.map((p) => p.id));
        setSubTeam2(responseTeamList.team2.players.map((p) => p.id));
        setTeamList(responseTeamList);
      } catch (error) {
        showToast('Something went wrong');
        Router.push('/itinerary');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idMatch]);

  return (
    <div className="LineUp">
      <Header name="Create Starting Lineups" />
      {loading && !teamList ? (
        <ScreenLoading height="90vh" />
      ) : (
        <>
          {showConfirmationModal && (
            <ConfirmModal
              open={showConfirmationModal}
              onConfirm={() => {
                setUserConfirmed(true);
                setShowConfirmationModa(false);
                handleSubmit(); // Re-call handleSubmit to proceed after confirmation
              }}
              onCancel={() => setShowConfirmationModa(false)}
              team1Name={teamList.team1.team_info.team_name}
              team2Name={teamList.team2.team_info.team_name}
              team1Count={team1.length}
              team2Count={team2.length}
            />
          )}
          {teamList && (
            <>
              <TeamList
                name={teamList.team1.team_info.team_name}
                color="red"
                players={teamList.team1.players}
                playersSubs={subTeam1}
                onSwitch={(player) =>
                  handleSwitchTeam(
                    team1,
                    setTeam1,
                    subTeam1,
                    setSubTeam1,
                    player
                  )
                }
                count={team1.length}
                maxCount={maxStarPlayers}
              />
              <TeamList
                name={teamList.team2.team_info.team_name}
                color="blue"
                players={teamList.team2.players}
                onSwitch={(player) =>
                  handleSwitchTeam(
                    team2,
                    setTeam2,
                    subTeam2,
                    setSubTeam2,
                    player
                  )
                }
                playersSubs={subTeam2}
                count={team2.length}
                maxCount={maxStarPlayers}
              />
              <SubmitButton loading={loading} handleSubmit={handleSubmit} />
            </>
          )}
        </>
      )}
    </div>
  );
};

const SubmitButton = ({ loading, handleSubmit }) => (
  <button className="button" onClick={handleSubmit} type="button">
    {!loading ? 'Go to Match' : 'Creating...'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </svg>
    <style jsx>
      {`
        .button {
          text-align: center;
          background-color: black;
          color: white;
          font-size: 20px;
          font-weight: 200;
          display: block;
          width: 85%;
          margin: 30px auto;
          border-radius: 4px;
          text-decoration: none;
          padding: 6px 0 1px;

          > svg {
            width: 40px;
            height: 40px;
            position: relative;
            top: -2px;
          }
        }
      `}
    </style>
  </button>
);

export default LineUp;
