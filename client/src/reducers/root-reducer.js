import { combineReducers } from 'redux';
import post from './post';
import channel from './channel';
import comment from './comment';
import auth from './auth';

export default combineReducers({
	post,
	channel,
	comment,
	auth
});