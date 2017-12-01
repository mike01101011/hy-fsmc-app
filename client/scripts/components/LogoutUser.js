// index > Logout
import React from 'react';

class LogoutUser extends React.Component {
    constructor() { // console.log('Logout-constructor');
        super();
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.deactivateUser = this.deactivateUser.bind( this );
    }
    render() { // console.log('Logout-render-this.state', this.state);
        return (
            <div>
                 <h2>Logout</h2>
                 <form onSubmit={ this.handleSubmit }>
                     <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter username" value={ this.state.username } />
                     <button>Logout</button>
                </form>
            </div>
        );
    }
    handleChange( e ) { // console.log('Logout-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) { // console.log('Logout-handleSubmit');
        e.preventDefault();
        this.props.users.map( (user, iteration) => {
            if ( user.username === this.state.username && user.active ) {
                this.deactivateUser( user );
                this.props.history.push(`/`);
            }
        } );
    }
    deactivateUser( user ) { // console.log('Logout-updateUser');
        const activeUser = Object.assign( {}, user );
        activeUser.active = false;
        fetch( `/api/users/${ user._id }`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify( activeUser ), } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '' } );
    }
}
export default LogoutUser;