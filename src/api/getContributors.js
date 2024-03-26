import { GET_CONTRIBUTORS_PATH } from '../constants';

export const getContributors = fetch(
  `${GET_CONTRIBUTORS_PATH}`,
  process.env.REACT_APP_TOKEN && {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
  },
);
