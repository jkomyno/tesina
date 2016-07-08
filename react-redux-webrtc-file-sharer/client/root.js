import React from 'react'
import { render } from 'react-dom';
// automatic css import with webpack
import css from './styles/style.styl'

// import components
import App from './components/App'
import Single from './components/Single'
import FileSharer from './components/FileSharer'

// import react router deps
import { Router, Route, IndexRoute } from 'react-router'
// expose our store to the app
import { Provider } from 'react-redux'
import store, { history } from './store'

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={FileSharer}></IndexRoute>
				<Route path="/view/:postId" component={Single}></Route>
			</Route>
		</Router>
	</Provider>
)

render(router, document.getElementById("root"));