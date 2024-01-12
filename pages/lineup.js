import React from 'react';
import Router from 'next/router';
import Header from '../components/Header';
import { Context, MATCH_ACTIVE_KEY } from '../provider';
import {
  fetchTeamList,
  fetchCreateStartingLineUp,
  fetchCreatePlayersStartMatch,
} from '../services';
import ScreenLoading from '../components/ScreenLoading';
import Item from '../components/Item';

/**
 * Represents a list of team players
 * @param {Object} props
 * @param {string} props.name - Name of the team
 * @param {string} props.color - Color of the team
 * @param {Array} props.players - List of players
 * @param {Function} props.onSwitch - Callback for switching players
 * @param {Array} props.playersSubs - List of substitute players
 */
const TeamList = ({ name, color, players, onSwitch, playersSubs }) => (
  <div className="TeamList">
    <span>{name}</span>
    <div className="content-wrapper">
      {Array.isArray(players) &&
        players.length > 0 &&
        players.map((p) => {
          const propsToItem = {
            color,
            onSwitch,
            number: p.squad_number.length ? p.squad_number[0].number : 0,
            start: !playersSubs.includes(p.id),
            key: p.id,
            id: p.id,
          };

          if (p.user && p.user.profile_pic) {
            propsToItem.img = p.user.profile_pic;
          }

          return <Item {...propsToItem} />;
        })}
    </div>
    <style jsx>
      {`
        .TeamList {
          margin-top: 10px;

          .content-wrapper {
            padding: 0 10px 0;
          }

          > span {
            width: 80%;
            margin: auto;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
            display: block;
            text-align: center;
            font-family: Quicksand;
            font-style: normal;
            font-weight: normal;
            font-size: 28px;
            line-height: 35px;
            text-align: center;
            color: #616060;
          }
        }
      `}
    </style>
  </div>
);

const LineUp = () => {
  // Context
  const context = React.useContext(Context);
  // eslint-disable-next-line react/destructuring-assignment
  const idMatch = context[MATCH_ACTIVE_KEY].id;
  const [loading, setLoading] = React.useState(true);
  const [teamList, setTeamList] = React.useState(null);
  const [team1, setTeam1] = React.useState([]);
  const [team2, setTeam2] = React.useState([]);
  const [subTeam1, setSubTeam1] = React.useState([]);
  const [subTeam2, setSubTeam2] = React.useState([]);

  const handleSwitchTeam1 = (arg) => {
    if (team1.includes(arg)) {
      const newSubTeam1 = [...subTeam1];
      newSubTeam1.push(arg);
      setSubTeam1(newSubTeam1);
      setTeam1([...team1.filter((id) => id !== arg)]);
    } else {
      const newTeam1 = [...team1];
      newTeam1.push(arg);
      setTeam1(newTeam1);
      setSubTeam1([...subTeam1.filter((id) => id !== arg)]);
    }
  };

  const handleSwitchTeam2 = (arg) => {
    if (team2.includes(arg)) {
      const newSubTeam2 = [...subTeam2];
      newSubTeam2.push(arg);
      setSubTeam2(newSubTeam2);
      setTeam2([...team2.filter((id) => id !== arg)]);
    } else {
      const newTeam2 = [...team2];
      newTeam2.push(arg);
      setTeam2(newTeam2);
      setSubTeam2([...subTeam2.filter((id) => id !== arg)]);
    }
  };

  console.log(teamList, 'TEAM LIST');

  const handleSubmit = async () => {
    const maxStarPlayers = Number(teamList.match_id.match_format[0]);
    if (team1.length === maxStarPlayers && team2.length === maxStarPlayers) {
      setLoading(true);
      const responseCreation = await fetchCreateStartingLineUp({
        team1,
        team2,
        subs1: subTeam1,
        subs2: subTeam2,
        game_id: idMatch,
      });
      // const responseCreatePlayersStartMatch =
      await fetchCreatePlayersStartMatch(
        [...team1, ...team2, ...subTeam1, ...subTeam2],
        idMatch
      );
      // console.log(responseCreatePlayersStartMatch)
      setLoading(false);
      if ('id' in responseCreation) {
        const msg = `Starting Line created`;
        context.showToast(msg);
        Router.push('/match');
      } else {
        const msg = 'Something went wrong';
        context.showToast(msg);
      }
    } else {
      const msg = `You must choose ${maxStarPlayers} players in each team`;
      context.showToast(msg);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTeamList = await fetchTeamList(idMatch);
        setSubTeam1([...responseTeamList.team1.players.map((p) => p.id)]);
        setSubTeam2([...responseTeamList.team2.players.map((p) => p.id)]);
        setTeamList(responseTeamList);
        setLoading(false);
      } catch (error) {
        // console.log(error);
        const msg = 'Something went wrong';
        context.showToast(msg);
        Router.push('/itinerary');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="LineUp">
      <Header name="Create Starting Lineups" />
      {!teamList && loading ? <ScreenLoading height="90vh" /> : null}
      {teamList ? (
        <>
          <TeamList
            name={teamList.team1.team_info.team_name}
            color="red"
            players={teamList.team1.players}
            playersSubs={subTeam1}
            onSwitch={handleSwitchTeam1}
          />
          <TeamList
            name={teamList.team2.team_info.team_name}
            color="blue"
            players={teamList.team2.players}
            onSwitch={handleSwitchTeam2}
            playersSubs={subTeam2}
          />
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
          </button>
        </>
      ) : null}
      <style jsx>
        {`
          .LineUp {
            min-height: 100vh;
            background-image: url('/static/default_bg.png');
            background-position: center center;
            background-size: cover;
          }

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
    </div>
  );
};

export default LineUp;
