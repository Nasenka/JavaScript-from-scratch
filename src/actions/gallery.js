import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { SET_GALLERY } from './constants';

const setGallery = data => {
  return {
    data,
    type: SET_GALLERY,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const fetchGallery = () => {
  return async dispatch => {
    const response = await unsplash.search.photos('cheese', 1, 18);
    const { results } = await toJson(response);

    dispatch(setGallery(results));
  };
};
