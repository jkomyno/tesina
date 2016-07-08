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
		case(ON_FILE_DATA):
      return Object.assign({}, state, {
        files: [
        	...action.files,
        	Object.assign({}, {
        		...action.data,
        		ownFile: action.isOwnFile,
        		fileProgressValue: action.fileProgressValue,
        		chunkFileSize: action.chunkFileSize,
        		fileBuffer: action.fileBuffer,
        		fileLeecher: action.fileLeecher
        	})
        ]
      });

    case(ON_PEER_FILE):
    	return Object.assign({}, state, {
    		files: [
	        Object.assign(action.fileObject, {
	          fileBuffer: [
	            ...action.fileObject.fileBuffer,
	            action.argFile,
	          ],
	          chunkFileSize: action.argChunkFileSize,
	          fileProgressValue: action.argFileProgressValue
	        }),
	        action.filteredFiles
    		]
    	});

		default:
			return state;
	}
}

export default filesReducer;