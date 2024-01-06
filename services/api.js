// api.js
import axios from 'axios';

const BASE_URL = 'https://bp-prod-api.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// GET MODEL
export const fetchAllLeagueProviders = async () => {
  try {
    const response = await api.get('/sport-entities?filter_by=league_provider');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST MODEL
export const createPlayerProfile = async (playerProfile) => {
  try {
    const response = await api.post('/auth/register/', playerProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the player profile');
  }
};

// POST MODEL WITH TOKEN
export const createTeam = async (teamInformation) => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the token exists
    if (!token) {
      throw new Error('No token found');
    }

    // Set up the headers with the Authorization token
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Make the POST request with the headers
    const response = await api.post('/teams/', teamInformation, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the team');
  }
};

export const getProxyData = async (code) => {
  try {
    const response = await api.get(`/players/proxy/get-proxy?code=${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching proxy data');
  }
};

export const loginRequest = async (credentials) => {
  try {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging in');
  }
};

export const createProxyPlayerSquad = async (proxyPlayersData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await api.post(
      '/players/proxy/bulk-create/',
      proxyPlayersData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating your squad');
  }
};
