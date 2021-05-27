import { SET_PHOTO } from '../actions/constants';

const initialState = {
  urls: {},
  user: {
    links: {},
    profile_image: {},
  },
  exif: {},
  tags: [],
  related_collections: {
    results: [],
  },
};

export default function photo(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTO: {
      return { ...action.data };
    }

    default:
      return state;
  }
}
