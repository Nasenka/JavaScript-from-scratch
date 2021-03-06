import {
  SET_PHOTO,
  SET_PHOTO_LIKE,
  SET_PHOTO_UNLIKE,
} from '../actions/constants';

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

    case SET_PHOTO_LIKE: {
      return {
        ...state,
        likes: state.likes + 1,
        liked_by_user: true,
      };
    }

    case SET_PHOTO_UNLIKE: {
      return {
        ...state,
        likes: state.likes - 1,
        liked_by_user: false,
      };
    }

    default:
      return state;
  }
}
