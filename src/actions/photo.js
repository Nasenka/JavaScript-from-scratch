import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { SET_PHOTO } from './constants';

const setPhoto = data => {
  return {
    data,
    type: SET_PHOTO,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const fetchPhoto = id => {
  return async dispatch => {
    const response = await unsplash.photos.getPhoto(id);
    const photo = await toJson(response);

    dispatch(setPhoto(photo));
  };
};
