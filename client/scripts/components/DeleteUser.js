// index > deleteuser
import React from 'react';
import { render } from 'react-dom';

class DeleteUser extends React.Component {
    constructor() {  // console.log('DeleteUser-constructor');
        super();
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.deleteUser = this.deleteUser.bind( this );
    }
    render() {  // console.log('DeleteUser-render-this.state', this.state);
        return (
            <div>
                <h2>Delete User</h2>
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter username to delete" value={ this.state.username } />
                    <button>Delete User</button>
                </form>
            </div>
        )
    }
    handleChange( e ) {  // console.log('DeleteUser-handleChange');
        this.setState( { [ e.target.name ]: e.target.value } );
    }
    handleSubmit( e ) {  // console.log('DeleteUser-handleSubmit');
        e.preventDefault();
        this.props.users.map( ( user ) => { if ( user.username === this.state.username ) { this.deleteUser( user._id ); } } );
    }
    deleteUser( userId ) {  // console.log('DeleteUser-deleteUser');
        fetch(`/api/users/${ userId }`, { method: 'DELETE' } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '', password: '', rank: 0, score: 0, active: false }, () => { this.props.history.push(`/`); } );
    }
}
export default DeleteUser;