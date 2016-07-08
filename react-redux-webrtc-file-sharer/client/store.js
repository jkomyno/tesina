import { createStore } from 'redux'
// hook up react router with redux
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

// import root reducer
import rootReducer from './reducers/index'

// create an object for the default data
const initialState = {
	user: ''
};

// enables hot reloading even for reducers
if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

const store = createStore(rootReducer, initialState,
      window.devToolsExtension && window.devToolsExtension());
export const history = syncHistoryWithStore(browserHistory, store);
export default store;