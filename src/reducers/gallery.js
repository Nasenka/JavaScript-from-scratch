import { SET_GALLERY } from '../actions/constants';

export default function gallery(state = [], action) {
  switch (action.type) {
    case SET_GALLERY: {
      return action.data;
    }

    default:
      return state;
  }
}
