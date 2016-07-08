const SET_P2P_SOCKET = 'SET_P2P_SOCKET';

function p2pSocketReducer(state = "", action) {
	switch(action.type){
		case(SET_P2P_SOCKET):
			// console.log(typeof action.mySocketId) -> string;

			return Object.assign({}, state,
				{
					p2pSocket: action.p2pSocket
				}
			);

		default:
			return state;
	}
}

export default p2pSocketReducer;