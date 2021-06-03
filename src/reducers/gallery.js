import {
  SET_GALLERY,
  SET_GALLERY_LIKE,
  SET_GALLERY_UNLIKE,
} from '../actions/constants';

export default function gallery(state = [], action) {
  switch (action.type) {
    case SET_GALLERY: {
      return [...action.data];
    }

    case SET_GALLERY_LIKE: {
      const newGallery = [...state];

      const photoIndex = newGallery.findIndex(item => item.id === action.id);

      const photo = newGallery[photoIndex];

      newGallery.splice(photoIndex, 1, {
        ...photo,
        likes: photo.likes + 1,
        liked_by_user: true,
      });

      return newGallery;
    }

    case SET_GALLERY_UNLIKE: {
      const newGallery = [...state];

      const photoIndex = newGallery.findIndex(item => item.id === action.id);

      const photo = newGallery[photoIndex];

      newGallery.splice(photoIndex, 1, {
        ...photo,
        likes: photo.likes - 1,
        liked_by_user: false,
      });

      return newGallery;
    }

    default:
      return state;
  }
}
