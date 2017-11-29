// index > login / createuser > usersingle > home
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './components/Home.js';
import CreateUser from './components/CreateUser.js';
import DeleteUser from './components/DeleteUser.js';
import EditUser from './components/EditUser.js';
import LoginUser from './components/LoginUser.js';
import LogoutUser from './components/LogoutUser.js';
import PageNotFound from './components/PageNotFound.js';

import UserSingle from './components/UserSingle';

class App extends React.Component {
    constructor() { //console.log('index-constructor');
        super();
        this.state = { users: [ {} ], activeUser: {}, activeSession: 0 }
        this.fetchUsers = this.fetchUsers.bind( this );
        this.fetchActiveUser = this.fetchActiveUser.bind( this );
    }
    render() { console.log('index-render-this.state', this.state);
        console.log('this.state.activeSession', this.state.activeSession);
        return (
            <Router>
                    { !this.state.activeSession ?
                    <div>
                        <header>
                            <h1>App</h1>
                            <ul>
                                <li><NavLink to="/create-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Create User</NavLink></li>
                                <li><NavLink to="/login-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Login User</NavLink></li>
                            </ul>
                        </header>
                        <Switch>
                            { <Route path="/" render={ () => <Home activeSession={ this.state.activeSession } /> } /> }
                            <Route path="/create-user" render={ () => <CreateUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                            <Route path="/login-user" render={ () => <LoginUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                            {/* <Route path="/" component={ PageNotFound } /> */}
                        { <Route component={ PageNotFound } /> }
                        </Switch>
                    </div>
                    :
                    <div>
                        <header>
                            <h1>App</h1>
                            <ul>
                                <li><NavLink to="/delete-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Delete User</NavLink></li>
                                <li><NavLink to="/edit-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Edit User</NavLink></li>
                                <li><NavLink to="/logout-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Logout User</NavLink></li>    
                            </ul>
                        </header>
                        <Switch>
                            { <Route path="/" render={ () => <Home activeSession={ this.state.activeSession } /> } /> }
                            <Route path="/delete-user" render={ () => <DeleteUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                            <Route path="/edit-user" render={ () => <EditUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                            <Route path="/logout-user" render={ () => <LogoutUser fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                            {/* <Route path="/" component={ PageNotFound } /> */}
                            { <Route component={ PageNotFound } /> }
                        </Switch>
                    </div>
                    }
            </Router>
        );
    }
    componentDidMount() { //console.log('index-componentDidMount');
        this.fetchUsers();
    }
    fetchUsers() { // console.log('index-fetchUsers');
        fetch( '/api/users' ).then( resp => resp.json() ).then( json => {
            this.setState( { users: json, activeUser: {}, activeSession: 0 } )
            this.fetchActiveUser( json );
        } );
    }
    fetchActiveUser( json ) { // console.log('index-fetchActiveUser');
        json.map( ( user, iteration ) => {
            if( user.active ) {
                this.setState( { activeUser: user, activeSession: 1 } );
                return
            }
        } )
    }
}
render(<App />, document.getElementById('app'));