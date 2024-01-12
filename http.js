export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://bp-prod-api.com/api'
    : 'https://bp-prod-api.com/api' ||
      'https://bp-prod-api.com/api' ||
      'https://bp-prod-api.com/api';
export const errorResultsNotFound = (err) =>
  'error' in err && err.error === 'There is no results found.';
