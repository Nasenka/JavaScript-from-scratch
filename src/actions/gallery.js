import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { SET_GALLERY, SET_GALLERY_LIKE, SET_GALLERY_UNLIKE } from './constants';

const setGallery = (data, totalPages) => {
  return {
    data,
    totalPages,
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
  return async (dispatch, getState) => {
    const response = await unsplash.search.photos(
      'cheese',
      getState().gallery.page,
      18,
    );
    const { results, total_pages: totalPages } = await toJson(response);

    dispatch(setGallery(results, totalPages));
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
