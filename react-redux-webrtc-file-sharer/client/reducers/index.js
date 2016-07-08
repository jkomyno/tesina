import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import userReducer from './userReducer'
import socketIdReducer from './socketIdReducer'
import socketUserListReducer from './socketUserListReducer'
import socketUserEnterLeaveMessageReducer from './socketUserEnterLeaveMessageReducer'
import filesReducer from './filesReducer'
import formErrorReducer from './formErrorReducer'
import p2pSocketReducer from './p2pSocketReducer'

const rootReducer = combineReducers({
	userReducer,
	socketIdReducer,
	socketUserListReducer,
	socketUserEnterLeaveMessageReducer,
	filesReducer,
	formErrorReducer,
	p2pSocketReducer,
	routing: routerReducer
});
export default rootReducer;