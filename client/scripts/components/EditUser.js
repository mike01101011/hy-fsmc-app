// index > CreateUser
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import UserSingle from './UserSingle';

class EditUser extends React.Component {
    constructor() { // console.log('EditUser-constructor');
        super();
        this.state = { username: '', newUsername: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }
    render() { // console.log('EditUser-render-this.state', this.state); console.log('EditUser-this.props', this.props );
        return (
            <div>{ this.props.activeUser ?
                <Router>
                    <Route path="/quiz/:userId" render={ () => <UserSingle activeUser={ this.props.activeUser } users={ this.state.users } user={ this.state.username } /> } />
                </Router>
                :
                <div>
                    <h2>Edit User</h2>
                    <form onSubmit={ this.handleSubmit }>
                        <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter username" value={ this.state.username } />
                        <input onChange={ this.handleChange } name="newUsername" type="text" placeholder="Enter new username" value={ this.state.newUsername } />
                        <button>Edit User</button>
                    </form>
                </div>
            }</div>
        )
    }
    handleChange( e ) { // console.log('EditUser-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) { // console.log('EditUser-handleSubmit');
        e.preventDefault();
        this.props.users.map( (user, iteration) => {
            if ( user.username === this.state.username ) {
                this.updateUser( user );
            }
        } );
        this.props.history.push(`/`);
    }
    updateUser( user ) { // console.log('EditUser-updateUser');
        const newUser = Object.assign( {}, user );
        newUser.username = this.state.newUsername;
        fetch( `/api/users/${ user._id }`, { method: 'PUT', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify( newUser ), } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '', newUsername: '' } );
    }
}
export default EditUser;