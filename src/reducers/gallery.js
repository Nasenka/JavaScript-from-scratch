import {
  SET_GALLERY,
  SET_GALLERY_LIKE,
  SET_GALLERY_UNLIKE,
} from '../actions/constants';

const initialState = {
  data: [],
  page: 1,
};

export default function gallery(state = initialState, action) {
  switch (action.type) {
    case SET_GALLERY: {
      return {
        ...state,
        data: [...state.data, ...action.data],
        page: state.page + 1,
      };
    }

    case SET_GALLERY_LIKE: {
      const newGallery = [...state.data];

      const photoIndex = newGallery.findIndex(item => item.id === action.id);

      const photo = newGallery[photoIndex];

      newGallery.splice(photoIndex, 1, {
        ...photo,
        likes: photo.likes + 1,
        liked_by_user: true,
      });

      return { ...state, data: newGallery };
    }

    case SET_GALLERY_UNLIKE: {
      const newGallery = [...state.data];

      const photoIndex = newGallery.findIndex(item => item.id === action.id);

      const photo = newGallery[photoIndex];

      newGallery.splice(photoIndex, 1, {
        ...photo,
        likes: photo.likes - 1,
        liked_by_user: false,
      });

      return { ...state, data: newGallery };
    }

    default:
      return state;
  }
}
