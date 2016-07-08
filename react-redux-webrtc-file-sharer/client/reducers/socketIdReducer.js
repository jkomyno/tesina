//import { ADD_SOCKET_ID } from '../actions/actionTypes'

const ADD_SOCKET_ID = 'ADD_SOCKET_ID';

function socketIdReducer(state = "", action) {
	switch(action.type){
		case(ADD_SOCKET_ID):
			// console.log(typeof action.mySocketId) -> string;

			return Object.assign({}, state,
				{
					socketId: action.mySocketId
				}
			);

		default:
			return state;
	}
}

export default socketIdReducer;