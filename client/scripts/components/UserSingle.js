// index > createuser / deleteuser / edituser > usersingle
import React from 'react';

class UserSingle extends React.Component {
	constructor() { // console.log('user-single-componentdidmount');
		super();
		this.state = { user: { username: '', password: '', rank: 0, score: 0, active: false } };
	}
	render() { // console.log('user-single-render-this.state', this.state);
		return (
			<div>
				<pre>{JSON.stringify(this.state, null, 3)}</pre>
			</div>
		);
	}
	componentDidMount() { // console.log('user-single-componentdidmount');
		fetch( `/api/users/${ this.props.match.params.userId }`, { method: 'GET', } ).then( res => res.json() ).then( user => { this.setState( { user } ); } );
	}
}
export default UserSingle;