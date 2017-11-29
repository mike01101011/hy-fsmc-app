// index > CreateUser
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import UserSingle from './UserSingle';

class CreateUser extends React.Component {
    constructor() {  // console.log('CreateUser-constructor');
        super();
        this.state = { username: '', password: '', rank: 0, score: 0, active: false };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }
    render() {  // console.log('CreateUser-render-this.state', this.state);
 // console.log('CreateUser-this.props', this.props );
        return (
            <div>{ this.props.activeUser ?
                <Router>
                    <Route path="/quiz/:userId" render={ () => <UserSingle activeUser={ this.props.activeUser } users={ this.state.users } user={ this.state.username } /> } />
                </Router>
                :
                <div>
                    <h2>Create User</h2>
                    <form onSubmit={ this.handleSubmit }>
                        <input onChange={ this.handleChange } name="username" type="text" placeholder="Enter new username" value={ this.state.username } />
                        <button>Create User</button>
                    </form>
                </div>
            }</div>
        )
    }
    handleChange( e ) {  // console.log('CreateUser-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) {  // console.log('CreateUser-handleSubmit');
        e.preventDefault();
        const user = Object.assign( {}, this.state );
        fetch( '/api/users', {  method: 'POST',  body: JSON.stringify( user ), headers: { 'Content-Type': 'application/json', } } ).then( () => this.props.fetchUsers() );
        this.setState( { username: '', password: '', rank: 0, score: 0, active: false } );
    }
}
export default CreateUser;