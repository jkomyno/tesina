import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

function mapStateToProps(state) {
	//console.log("state: " + JSON.stringify(state, null, 2));
	return {
		user: state.userReducer,
		mySocketId: state.socketIdReducer.socketId,
		userList: state.socketUserListReducer,
		files: state.filesReducer,
		userEnterLeaveMessage: state.socketUserEnterLeaveMessageReducer,
		errorMessage: state.formErrorReducer,
		p2pSocket: state.p2pSocketReducer.p2pSocket
	}
}

function mapDispatchToProps(dispatch) {
	// adds every action to the global state, which will be accessed by
	// the children components from this.props
	return bindActionCreators(actionCreators, dispatch);
}

// inject data from the store to the component Main, without
// directly importing the store
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;