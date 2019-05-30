import { combineReducers } from 'redux';

import { authReducer } from './modules/auth';
import { meetupReducer } from './modules/meetup';
import { questionReducer } from './modules/question';

export default combineReducers({
  auth: authReducer,
  meetup: meetupReducer,
  question: questionReducer,
});
