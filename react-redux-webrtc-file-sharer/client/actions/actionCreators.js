/*import { ADD_USER_TO_LIST,
				 ADD_SOCKET_ID,
				 SET_USER_LIST,
				 SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR,
				 SET_USER_ENTER_LEAVE_MESSAGE,
				 SET_FORM_ERROR_MESSAGE,
				 ON_FILE_DATA,
				 ON_PEER_FILE,
				 ON_RECEIVED_PEER_FILE,
				 ON_RETURN_FILE_BACK
			 } from './actionTypes'; */
import store from '../store';

const CREATE_USER = 'CREATE_USER';
const ADD_USER_TO_LIST = 'ADD_USER_TO_LIST';
const ADD_SOCKET_ID = 'ADD_SOCKET_ID';
const SET_USER_LIST = 'SET_USER_LIST';
const SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR = 'SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR';
const SET_FORM_ERROR_MESSAGE = 'SET_FORM_ERROR_MESSAGE';
const ON_FILE_DATA = 'ON_FILE_DATA';
const ON_PEER_FILE = 'ON_PEER_FILE';
const ON_RECEIVED_PEER_FILE = 'ON_RECEIVED_PEER_FILE';
const ON_RETURN_FILE_BACK = 'ON_RETURN_FILE_BACK';
const SET_USER_ENTER_LEAVE_MESSAGE = 'SET_USER_ENTER_LEAVE_MESSAGE';
const SET_P2P_SOCKET = 'SET_P2P_SOCKET';

export function addUser(user) {
	return {
		type: CREATE_USER,
		user
	}
}

export function onGetSocketId(mySocketId) {
	return {
		type: ADD_SOCKET_ID,
		mySocketId
	}
}

// copy remote userList into local userList
export function setUserList(userList) {
	return {
		type: SET_USER_LIST,
		userList
	}
}

export function setUserEnterLeaveMessageAndColor(message, messageColor) {
	return {
		type: SET_USER_ENTER_LEAVE_MESSAGE_AND_COLOR,
		message,
		messageColor
	}
}

// USELESS?
export function setUserEnterLeaveMessage(message) {
	return {
		type: SET_USER_ENTER_LEAVE_MESSAGE,
		message
	}
}

export function overwriteUserList(data) {
	return {
		type: OVERWRITE_USER_LIST,

	}
}

export function onNewUser(data) {
	store.dispatch(onGetUserList(data));
}

export function onDisconnectUser(data) {
	store.dispatch(onGetUserList(data));
}

export function onFileData(data, files, ownFile) {
	return {
		type: ON_FILE_DATA,
		files: [
			...files,
			Object.assign({}, {
				...data,
				ownFile: ownFile,
        fileProgressValue: 0,
        chunkFileSize: 0,
        fileBuffer: [],
        fileLeechers: [],
			})
		]
	}
}

export function onPeerFile(data, fileObject, filteredFiles) {
	return {
		type: ON_PEER_FILE,
		files: [
			Object.assign(fileObject, {
				fileBuffer: [
					...fileObject.fileBuffer,
					data.file
				],
				chunkFileSize: fileObject.chunkFileSize + data.file.byteLength,
				fileProgressValue: fileObject.fileProgressValue + data.file.byteLength
			}),
			...filteredFiles
		]
	}
}

export function onReceivedPeerFile(fileObject, fileUrl, fileBuffer, chunkFileSize, fileProgressValue, filteredFilesDef) {
	return {
		type: ON_RECEIVED_PEER_FILE,
    files: [
      Object.assign(fileObject, {
        fileUrl,
        fileBuffer: [],
        chunkFileSize: 0,
        fileProgressValue: 0,
      }),
      ...filteredFiles
    ]
	}
}

export function onReturnFileBack(requestedFileObject, leechers, filteredFiles) {
	return {
		type: ON_RETURN_FILE_BACK,
		files: [
			Object.assign(requestedFileObject, {
				fileLeechers: leechers
			}),
			...filteredFiles
		]
	}
}

export function setFormErrorMessage(error) {
	return {
		type: SET_FORM_ERROR_MESSAGE,
		error
	}
}

export function setP2pSocket(p2pSocket) {
	return {
		type: SET_P2P_SOCKET,
		p2pSocket
	}
}