import React, { Component } from 'react'

class WelcomeScreen extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const { addUser } = this.props;
		const user = this.refs.userName.value;
		if(user != '') addUser(user);
		// clears the form values
		this.refs.userForm.reset();
	}

	render() {
		const { addUser } = this.props;

		return (
      <div className="col-md-4 col-sm-6 col-xs-6 col-md-offset-3 col-sm-offset-3 col-xs-offset-3">
        <div style={{ marginTop: '150px' }}>
          <form onSubmit={this.handleSubmit} ref="userForm">
            <div className="form-group">
              <label>Enter your Username: </label>
              <input className="form-control"
                type="text" id="username"
                ref="userName" placeholder="Your Name" />
            </div>
            <input type="submit" className="btn btn-default" value="Enter" />
          </form>
        </div>
      </div>
		)
	}
}

export default WelcomeScreen;