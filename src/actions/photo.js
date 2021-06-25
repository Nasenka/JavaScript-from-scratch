import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { SET_PHOTO, SET_PHOTO_LIKE, SET_PHOTO_UNLIKE } from './constants';

const setPhoto = data => {
  return {
    data,
    type: SET_PHOTO,
  };
};

const setLike = () => {
  return {
    type: SET_PHOTO_LIKE,
  };
};

const setUnlike = () => {
  return {
    type: SET_PHOTO_UNLIKE,
  };
};

export const fetchPhoto = id => {
  return async dispatch => {
    const response = await unsplash.photos.getPhoto(id);
    const photo = await toJson(response);

    dispatch(setPhoto(photo));
  };
};

export const fetchLike = id => {
  return async dispatch => {
    await unsplash.photos.likePhoto(id);

    dispatch(setLike(id));
  };
};

export const fetchUnlike = id => {
  return async dispatch => {
    await unsplash.photos.unlikePhoto(id);

    dispatch(setUnlike(id));
  };
};
