// import { CREATE_USER } from '../actions/actionTypes'

const CREATE_USER = 'CREATE_USER';

function userReducer(state = "", action) {
	switch(action.type){
		case(CREATE_USER):
			// console.log(typeof action.user) -> string;
			return [
				...state,
				action.user
			];

		default:
			return state;
	}
}

export default userReducer;