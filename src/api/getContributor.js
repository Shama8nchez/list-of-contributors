import { GET_CONTRIBUTOR_PATH } from '../constants';

export const getContributor = login =>
  fetch(
    `${GET_CONTRIBUTOR_PATH}${login}`,
    process.env.REACT_APP_TOKEN && {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    },
  );
