import { combineReducers } from 'redux';

import gallery from './gallery';
import photo from './photo';
import user from './user';

export default combineReducers({
  gallery,
  photo,
  user,
});
