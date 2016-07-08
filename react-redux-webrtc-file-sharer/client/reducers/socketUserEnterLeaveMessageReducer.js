/*import { SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR,
					 SET_USER_ENTER_LEAVE_MESSAGE } from '../actions/actionTypes'*/

const SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR = 'SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR';
const SET_USER_ENTER_LEAVE_MESSAGE = 'SET_USER_ENTER_LEAVE_MESSAGE';

function socketUserEnterLeaveMessageReducer(state = "", action) {
	switch(action.type){
		case(SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR):
	      return Object.assign({}, state, {
	        message: action.message,
	        messageColor: action.messageColor
	      });
	    case(SET_USER_ENTER_LEAVE_MESSAGE):
	    	return Object.assign({}, state, {
	    		message: action.message
	    	});
		default:
			return state;
	}
}

export default socketUserEnterLeaveMessageReducer;