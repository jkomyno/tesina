/*import { ON_FILE_DATA,
		 ON_PEER_FILE,
		 ON_RECEIVED_PEER_FILE,
		 ON_RETURN_FILE_BACK } from '../actions/actionTypes'*/

const ON_FILE_DATA = 'ON_FILE_DATA';
const ON_PEER_FILE = 'ON_PEER_FILE';
const ON_RECEIVED_PEER_FILE = 'ON_RECEIVED_PEER_FILE';

// a little bit hacky, I know
function filesReducer(state = {}, action) {

	console.log("TYPE: ", action.type);
	console.log("FILES: ", JSON.stringify(action.files, null, 2));

	switch(action.type){
		case(ON_FILE_DATA || ON_PEER_FILE || ON_RECEIVED_PEER_FILE || ON_RETURN_FILE_BACK):
      return Object.assign({}, state, {
        files: action.files
      });

		default:
			return state;
	}
}

export default filesReducer;