import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { SET_GALLERY, SET_GALLERY_LIKE, SET_GALLERY_UNLIKE } from './constants';

const setGallery = data => {
  return {
    data,
    type: SET_GALLERY,
  };
};

const setLike = id => {
  return {
    id,
    type: SET_GALLERY_LIKE,
  };
};

const setUnlike = id => {
  return {
    id,
    type: SET_GALLERY_UNLIKE,
  };
};

export const fetchGallery = () => {
  return async dispatch => {
    const response = await unsplash.search.photos('cheese', 1, 18);
    const { results } = await toJson(response);

    dispatch(setGallery(results));
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
