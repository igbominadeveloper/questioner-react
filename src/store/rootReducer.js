import { combineReducers } from 'redux';

import { authReducer } from './modules/auth';
import { meetupReducer } from './modules/meetup';

export default combineReducers({ auth: authReducer, meetup: meetupReducer });
