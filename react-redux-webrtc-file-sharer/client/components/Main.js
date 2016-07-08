import React, { Component } from 'react'
import { Link } from 'react-router'

class Main extends Component {

	render() {

		// note that I can't just take this.props.children (populated
		// by react-router) and pass them along to child component.
		// I gotta clone them into this.props

		return (
			<div>
				<h2>
					<Link to="/">React Redux WebRTC File Sharer</Link>
				</h2>
				{React.cloneElement(this.props.children, {...this.props, key: undefined, ref: undefined})}

			</div>
		)
	}
}

export default Main;