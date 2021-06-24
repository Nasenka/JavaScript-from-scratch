import { toJson } from 'unsplash-js';

import unsplash from '../unsplash';

import { RESET_USER, SET_USER } from './constants';

const setUser = data => {
  return {
    data,
    type: SET_USER,
  };
};

export const resetUser = () => ({ type: RESET_USER });

export const fetchUser = () => {
  return async dispatch => {
    const response = await unsplash.currentUser.profile();
    const user = await toJson(response);

    dispatch(setUser(user));
  };
};
