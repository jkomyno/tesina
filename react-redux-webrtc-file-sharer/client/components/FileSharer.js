import React, { Component } from 'react'
import WelcomeScreen from './WelcomeScreen'
import CoreSocket from './CoreSocket'
import User from './User'

class FileSharer extends Component {

	render() {
	  let { user } = this.props;

	  /*
	   * In a nutshell: if user isn't logged in, then show the login page.
	   * Else, don't render the WelcomeScreen component.
	   * The ternary operator ( : ? ) was really handy in this case.
	   */

		return (
			user ?
			<div className="container wrapper">
				<CoreSocket {...this.props} />
			</div> :
			<div>
				<WelcomeScreen {...this.props}/>
			</div>
		)
	}
}

export default FileSharer;