// index > login / createuser > usersingle > home
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

import CreateUser from './components/CreateUser';
import DeleteUser from './components/DeleteUser';
import EditUser from './components/EditUser';
import LoginUser from './components/LoginUser';
import LogoutUser from './components/LogoutUser';

import UserSingle from './components/UserSingle';

class App extends React.Component {
    constructor() { //console.log('index-constructor');
        super();
        this.state = { users: [ {} ], activeUser: {} }
        this.fetchUsers = this.fetchUsers.bind( this );
        this.fetchActiveUser = this.fetchActiveUser.bind( this );
    }
    render() { console.log('index-render-this.state', this.state);
        return (
            <Router>
                <div>
                    <header>
                        <h1>App</h1>
                        <ul>
                            <li><NavLink to="/create-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Create User</NavLink></li>
                            <li><NavLink to="/delete-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Delete User</NavLink></li>
                            <li><NavLink to="/edit-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Edit User</NavLink></li>
                            <li><NavLink to="/login-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Login User</NavLink></li>
                            <li><NavLink to="/logout-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Logout User</NavLink></li>
                        </ul>
                     </header>
                     <Route path="/create-user" render={ () => <CreateUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                     <Route path="/delete-user" render={ () => <DeleteUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                     <Route path="/edit-user" render={ () => <EditUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                     <Route path="/login-user" render={ () => <LoginUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                     <Route path="/logout-user" render={ () => <LogoutUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                 </div>
            </Router>
        )
    }
    componentDidMount() { //console.log('index-componentDidMount');
        this.fetchUsers();
    }
    fetchUsers() { // console.log('index-fetchUsers');
        fetch( '/api/users' ).then( resp => resp.json() ).then( json => {
            this.setState( { users: json, activeUser: {} } )
            this.fetchActiveUser( json );
        } );
    }
    fetchActiveUser( json ) { // console.log('index-fetchActiveUser');
        json.map( ( user, iteration ) => {
            if( user.active ) {
                this.setState( { activeUser: user } );
            }
        } )
    }
}
render(<App />, document.getElementById('app'));