import { RESET_USER, SET_USER } from '../actions/constants';

export default function user(state = null, action) {
  switch (action.type) {
    case SET_USER: {
      return { ...action.data };
    }

    case RESET_USER: {
      return null;
    }

    default:
      return state;
  }
}
