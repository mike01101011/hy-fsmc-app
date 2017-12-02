// index > login / createuser > usersingle > home
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home.js';
import Quiz from './components/Quiz.js';
import CreateUser from './components/CreateUser.js';
import DeleteUser from './components/DeleteUser.js';
import EditUser from './components/EditUser.js';
import LoginUser from './components/LoginUser.js';
import LogoutUser from './components/LogoutUser.js';
import PageNotFound from './components/PageNotFound.js';

class App extends React.Component {
    constructor() { // console.log('index-constructor');
        super();
        this.state = { users: [ {} ], activeUser: {}, activeSession: false }
        this.fetchUsers = this.fetchUsers.bind( this );
        this.initiateActiveUser = this.initiateActiveUser.bind( this );
    }
    render() { // console.log('index-render-this.state', this.state);
        console.log('index-render-this.state.activeUser', this.state.activeUser);
        return (
            <Router>
                <div>
                    <Route path="/" render={ () => <Home activeSession={ this.state.activeSession } /> } />
                        { !this.state.activeSession ?
                            <Switch>
                                <Route path="/create-user" render={ ( props ) => <CreateUser fetchUsers={ this.fetchUsers } users={ this.state.users } history={ props.history } /> } />
                                <Route path="/login-user" render={ ( props ) => <LoginUser fetchUsers={ this.fetchUsers } users={ this.state.users } history={ props.history } /> } />
                                {/* <Route path="/.+" component={ PageNotFound } /> */} <Route component={ PageNotFound } />
                            </Switch>
                        :
                            <Switch>
                                <Route path="/quiz" render={ ( props ) => <Quiz activeUser={ this.state.activeUser } history={ props.history } /> } />
                                <Route path="/delete-user" render={ ( props ) => <DeleteUser fetchUsers={ this.fetchUsers } users={ this.state.users } history={ props.history } /> } />
                                <Route path="/edit-user" render={ ( props ) => <EditUser fetchUsers={ this.fetchUsers } users={ this.state.users } history={ props.history } /> } />
                                <Route path="/logout-user" render={ ( props ) => <LogoutUser fetchUsers={ this.fetchUsers } users={ this.state.users } history={ props.history } /> } />
                                {/* <Route path="/.+" component={ PageNotFound } /> */} <Route component={ PageNotFound } />
                            </Switch>
                        }
                </div>
            </Router>
        );
    }
    componentDidMount() { // console.log('index-componentDidMount');
        this.fetchUsers();
    }
    fetchUsers() { // console.log('index-fetchUsers');
        fetch( '/api/users' ).then( resp => resp.json() ).then( json => { this.setState( { users: json, activeUser: {}, activeSession: false }, () => { this.initiateActiveUser( json ); } ); } );
    }
    initiateActiveUser( json ) { // console.log('index-initiateActiveUser');
        json.map( ( user, iteration ) => { if( user.active ) { this.setState( { activeUser: user, activeSession: true }, () => { return true } ); } } );
    }
}
render(<App />, document.getElementById('app'));