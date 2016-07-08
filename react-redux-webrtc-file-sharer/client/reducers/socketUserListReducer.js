// import { ADD_USER_LIST } from '../actions/actionTypes'

const SET_USER_LIST = 'SET_USER_LIST';

function socketUserListReducer(state = [], action) {
	switch(action.type){
		case(SET_USER_LIST):
			// console.log(typeof action.user) -> array;
			return [
				...action.userList
			]

		default:
			return state;
	}
}

export default socketUserListReducer;