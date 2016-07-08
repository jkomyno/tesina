//import { SET_FORM_ERROR_MESSAGE } from '../actions/actionTypes'

const SET_FORM_ERROR_MESSAGE = 'SET_FORM_ERROR_MESSAGE';

function formErrorReducer(state = "", action) {
	switch(action.type){
		case(SET_FORM_ERROR_MESSAGE):
			// console.log(typeof action.mySocketId) -> string;
			return [
				...state,
				action.error
			];
		default:
			return state;
	}
}

export default formErrorReducer;