// api.js
import axios from 'axios';

const BASE_URL = 'https://bp-prod-api.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchAllLeagueProviders = async () => {
  try {
    const response = await api.get(
      '/sport-entities?filter_by=league_provider/'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPlayerProfile = async (playerProfile) => {
  try {
    const response = await api.post('/auth/register/', playerProfile);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating the player profile');
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
    const response = await api.post(
      '/players/proxy/bulk-create/',
      proxyPlayersData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while creating your squad');
  }
};
