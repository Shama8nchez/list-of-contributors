import { GET_CONTRIBUTORS_PATH } from '../constants';

export const getContributors = fetch(`${GET_CONTRIBUTORS_PATH}`, {
  headers: {
    Authorization:
      'Bearer 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',
  },
});
