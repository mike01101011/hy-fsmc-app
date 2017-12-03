// index > createuser
import React from 'react';
import { render } from 'react-dom';

class CreateUser extends React.Component {
    constructor() {  // console.log('CreateUser-constructor');
        super();
        this.state = { username: '', password: '', rank: 0, highScore: 0, active: false };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }
    render() {  // console.log('CreateUser-render-this.state', this.state);
        return (
            <div>
                <h2>Create User</h2>
                <form onSubmit={ this.handleSubmit }>
                    <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter new username" value={ this.state.username } />
                    <button>Create User</button>
                </form>
            </div>
        )
    }
    handleChange( e ) {  // console.log('CreateUser-handleChange');
        this.setState( { [ e.target.name ]: e.target.value } );
    }
    handleSubmit( e ) {  // console.log('CreateUser-handleSubmit');
        e.preventDefault();
        const user = Object.assign( {}, this.state );
        fetch( '/api/users', {  method: 'POST',  body: JSON.stringify( user ), headers: { 'Content-Type': 'application/json' } } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '', password: '', rank: 0, highScore: 0, active: false }, () => { this.props.history.push(`/login-user`); } );
    }
}
export default CreateUser;