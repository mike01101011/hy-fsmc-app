// index > Login
import React from 'react';

class LoginUser extends React.Component {
    constructor() { // console.log('login-constructor');
        super();
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.activateUser = this.activateUser.bind( this );
    }
    render() { // console.log('login-render-this.state', this.state);


console.log('this.history', this.history);

        return (
            <div>
                 <h2>Login</h2>
                 <form onSubmit={ this.handleSubmit }>
                     <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter username" value={ this.state.username } />
                     <button>Login</button>
                </form>
            </div>
        );
    }
    handleChange( e ) { // console.log('login-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) { // console.log('login-handleSubmit');
        e.preventDefault();
        this.props.users.map( (user, iteration) => {
            if ( user.username === this.state.username ) {
                this.activateUser( user );
            }
        } );
        this.props.history.push(`/`);
    }
    activateUser( user ) { // console.log('login-updateUser');
        const activeUser = Object.assign( {}, user );
        activeUser.active = true;
        fetch( `/api/users/${ user._id }`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify( activeUser ), } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '' } );
    }
}
export default LoginUser;