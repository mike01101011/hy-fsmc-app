// index > createuser / deleteuser / edituser > usersingle
import React from 'react';

class UserSingle extends React.Component {
	constructor() { // console.log('user-single-componentdidmount');
		super();
		this.state = { activeUser: { username: '', password: '', rank: null, highScore: null, active: false } };
	}
	render() { // console.log('user-single-render-this.state', this.state);
		return (
			<div>
				<h3>JSON</h3>
				<pre>{ JSON.stringify( this.state, null, 3 ) }</pre>
			</div>
		);
	}
	componentDidMount() { // console.log('user-single-componentdidmount');
		const activeUserId = this.props.activeUser._id;
		fetch( `/api/users/${ activeUserId }`, { method: 'GET' } ).then( ( res ) => res.json() )
		.then( ( activeUser ) => { this.setState( { activeUser: activeUser } ); } );
	}
}
export default UserSingle;