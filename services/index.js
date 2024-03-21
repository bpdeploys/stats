import { BASE_URL, errorResultsNotFound } from '../http';

export const matchsOfficiatedCounted = (id) => {
  if (!id) {
    throw Error('You must send the id as parameter');
  }
  return window
    .fetch(`${BASE_URL}/referees/${id}/matches?count=true`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => res.matches_officiated)
    .catch((err) => err);
};

export const login = ({ email, password }, resCallback, errCallback) => {
  return fetch(`${BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: String(email),
      password: String(password),
    }),
  })
    .then((res) => res.json())
    .then(resCallback)
    .catch(errCallback);
};

export const fetchUserData = (token) => {
  return fetch(`${BASE_URL}/current-user/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json());
  // .catch((err) => err);
};

export const fetchMatchsForOfficiate = (id) => {
  if (!id) {
    throw Error('You must send the id as parameter');
  }

  return window
    .fetch(`${BASE_URL}/referees/${id}/matches?for_officiate=true`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (errorResultsNotFound(res)) {
        return [];
      }
      console.log(res);
      return res;
    })
    .catch((err) => err);
};

export const fetchMatchsForOfficiateCounted = (id) => {
  if (!id) {
    throw Error('You must send the id as parameter');
  }
  return window
    .fetch(`${BASE_URL}/referees/${id}/matches?count_officiate=true`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (errorResultsNotFound(res)) {
        return 0;
      }
      return res.count;
    })
    .catch((err) => err);
};

export const fetchUpdateUserAttrs = (userId, attrs) => {
  if (!userId) {
    throw Error('You must send the id as parameter');
  } else if (!attrs) {
    throw Error('You must send the attrs object as parameter');
  }

  return window
    .fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(attrs),
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const fetchUpdateUserImage = (userId, file) => {
  if (!userId) {
    throw Error('You must send the id as parameter');
  } else if (!file) {
    throw Error('You must send the file as parameter');
  }

  const formData = new window.FormData();

  formData.append('profile_pic', file);

  return window
    .fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
      },
      method: 'PATCH',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const fetchMatchCode = (code) => {
  if (!code) {
    throw Error('You must send the match code as parameter');
  }
  return window
    .fetch(`${BASE_URL}/match-code/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchTeamList = (idMatch) => {
  if (!idMatch) {
    throw Error('You must send the id of the match as parameter');
  }
  return window
    .fetch(`${BASE_URL}/team-list/${idMatch}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const fetchCreateStartingLineUp = (data) => {
  if (!data) {
    throw Error('You must send the data object as parameter');
  }
  if (!data.team1.length || !data.team2.length) {
    throw Error('Attributes team1 and team2 must need items');
  }
  return window
    .fetch(`${BASE_URL}/starting-lineups/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchCreatePlayersStartMatch = (arrayIdsPlayers, idMatch) => {
  if (Array.isArray(arrayIdsPlayers) && arrayIdsPlayers.length && idMatch) {
    return window
      .fetch(`${BASE_URL}/player-start-match/`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          players: arrayIdsPlayers,
          game_id: idMatch,
        }),
      })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => err);
  }
  throw Error(
    'The argument arrayIdsPlayers must be a array with ids and idMatch must be a id'
  );
};

export const fetchGetMatchActiveInfo = (idMatch) => {
  if (!idMatch) {
    throw Error('Please set the idMatch to find the match correctly');
  }
  return window
    .fetch(`${BASE_URL}/matches/${idMatch}?info=True`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const fetchGetStartingLineUp = async (idMatch) => {
  if (!idMatch) {
    throw new Error(
      'Please set the idMatch to find the starting lineup correctly'
    );
  }
  const response = await fetch(`${BASE_URL}/starting-lineups/${idMatch}`, {
    headers: {
      Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 404) {
    throw new Error('NotFound');
  }

  if (!response.ok) {
    throw new Error('An error occurred');
  }

  return response.json();
};

export const fetchStartClock = (idMatch) => {
  if (!idMatch) {
    throw Error('Please set the idMatch to start the clock');
  }
  const body = {
    status: 'Match Begin',
    match_time: '00:00',
    game_id: idMatch,
  };
  return window
    .fetch(`${BASE_URL}/match-play/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
};

export const checkIfMatchIsRunning = (idMatch) => {
  if (!idMatch) {
    throw Error('Please set the idMatch to start the clock');
  }
  return window
    .fetch(`${BASE_URL}/match-play/?match_id=${idMatch}`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchCreateSubstitution = ({
  playerOutId,
  playerInId,
  teamId,
  timeMatch,
  playerOutDuration: { on },
  matchId,
  team1,
  team2,
  subs1,
  subs2,
}) => {
  if (!(playerOutId && playerInId && teamId && timeMatch && on && matchId)) {
    console.log(playerOutId, playerInId, teamId, timeMatch, on, matchId);
    throw Error('Please send all parameters');
  }
  if (
    !team1 ||
    !team2 ||
    !subs1 ||
    !subs2 ||
    !team1.length ||
    !team2.length ||
    !subs1.length ||
    !subs2.length
  ) {
    throw Error('Send the four arrays');
  }
  const body = {
    player: playerOutId,
    player_off: playerInId,
    team: teamId,
    status: 'Off',
    status_player_off: 'On',
    time: timeMatch,
    dur_on: on,
    game: matchId,
    team1,
    team2,
    subs1,
    subs2,
  };
  // eslint-disable-next-line no-console
  console.log(body);
  return window
    .fetch(`${BASE_URL}/subtitutions`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchCreateGoal = ({
  scorer,
  assist,
  team,
  half,
  time,
  goal_type,
  location,
  game,
  day_time,
  team_op,
}) => {
  if (
    !(
      scorer &&
      team &&
      half &&
      time &&
      goal_type &&
      location &&
      game &&
      day_time &&
      team_op
    )
  ) {
    throw Error('Please send all parameters');
  }
  return window
    .fetch(`${BASE_URL}/goals/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        scorer,
        assist,
        team,
        half,
        time,
        goal_type,
        location,
        game,
        day_time,
        team_op,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchCreateFoul = ({
  fouled,
  fouler,
  half,
  time,
  team,
  team_op,
  outcome,
  game,
  caution,
  status,
  location,
}) => {
  if (
    !(
      fouler &&
      half &&
      time &&
      team &&
      team_op &&
      outcome &&
      game &&
      caution &&
      status &&
      location
    )
  ) {
    throw Error('Please send all parameters');
  }
  return window
    .fetch(`${BASE_URL}/fouls/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ...(fouled ? { fouled } : null),
        fouler,
        half,
        time,
        team,
        team_op,
        outcome,
        game,
        caution,
        status,
        location,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const setManOfTheMatch = async ({ player_id, game_id }) => {
  if (!player_id || !game_id) {
    throw Error(`Please set player_id and game_id`);
  }

  return window
    .fetch(`${BASE_URL}/man-of-the-match/`, {
      headers: {
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ player_id, game_id }),
    })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export const fetchEndMatch = async (args) => {
  const requiredFields = [
    'game_id',
    'match_time_finish',
    'match_time_start',
    'league_id',
    'team_1_players',
    'team_1_id',
    'team_2_players',
    'team_2_id',
    'match_time_finish_date',
  ];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < requiredFields.length; i++) {
    const arg = requiredFields[i];
    if (!args[arg]) {
      throw Error(`Please set ${arg}`);
    }
  }

  const {
    game_id,
    match_time_finish,
    league_id,
    team_1_players,
    team_1_id,
    team_2_players,
    team_2_id,
    match_time_start,
    match_time_finish_date,
  } = args;

  if (!Array.isArray(team_1_players) || !Array.isArray(team_2_players)) {
    throw Error(
      `team_1_players and team_2_players must be a array of integers`
    );
  }

  const requestOptions = {
    headers: {
      Authorization: `Token ${window.localStorage.getItem('TOKEN')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  await window.fetch(`${BASE_URL}/match-play/`, {
    ...requestOptions,
    body: JSON.stringify({
      status: 'Full-Time',
      half: 'Second Half',
      match_time: match_time_finish,
      game_id,
    }),
  });

  await window.fetch(`${BASE_URL}/player-played/`, {
    ...requestOptions,
    body: JSON.stringify({
      players: team_1_players,
      team: team_1_id,
      played: true,
      game_id,
    }),
  });

  await window.fetch(`${BASE_URL}/player-played/`, {
    ...requestOptions,
    body: JSON.stringify({
      players: team_2_players,
      team: team_2_id,
      played: true,
      game_id,
    }),
  });

  await window.fetch(`${BASE_URL}/game-stats/`, {
    ...requestOptions,
    body: JSON.stringify({
      start: match_time_start,
      finish: match_time_finish_date,
      league: league_id,
      game_id,
    }),
  });
};
