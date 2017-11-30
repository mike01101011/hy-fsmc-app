// index > DeleteUser
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import UserSingle from './UserSingle';

class DeleteUser extends React.Component {
    constructor() {  // console.log('DeleteUser-constructor');
        super();
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.deleteUser = this.deleteUser.bind( this );
    }
    render() {  // console.log('DeleteUser-render-this.state', this.state);
 // console.log('DeleteUser-this.props', this.props );
        return (
            <div>
                <h2>Delete User</h2>
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter new username" value={ this.state.username } />
                    <button>Delete User</button>
                </form>
            </div>
        )
    }
    handleChange( e ) {  // console.log('DeleteUser-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) {  // console.log('DeleteUser-handleSubmit');
        e.preventDefault();
        this.props.users.map( user => {
            if ( user.username === this.state.username ) {
                const userId = user._id;
                this.deleteUser( userId );
            }
        } );
        this.props.history.push(`/`);
    }
    deleteUser( userId ) {  // console.log('DeleteUser-deleteUser');
        fetch(`/api/users/${ userId }`, { method: 'DELETE' } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '', password: '', rank: 0, score: 0, active: false } );
    };
}
export default DeleteUser;




