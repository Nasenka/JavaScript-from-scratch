import { combineReducers } from 'redux';

import gallery from './gallery';
import photo from './photo';

export default combineReducers({
  gallery,
  photo,
});
