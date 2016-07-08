import React, { Component } from 'react'

class User extends Component {

	render() {
		const { userList,
		        userEnterLeaveMessage } = this.props; 

		const users = userList.map(function(user, i){
		  return (
		  	<li key={i}>
		  		{user.username}
		  	</li>
		  )
		});
		
		return (
      <div className="col-md-6 col-sm-6 col-xs-6">
        <div className="pull-right">
          <h5>Who is online?</h5>
          {
            userEnterLeaveMessage ?
              <h6 style={{ color: userEnterLeaveMessage.messageColor }}>
                {userEnterLeaveMessage.message}
              </h6> :
              null
          }
          <ul>
            {users}
          </ul>
        </div>
      </div>
		)
	}
}

export default User;