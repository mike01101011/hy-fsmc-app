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

import UserSingle from './components/UserSingle.js';

class App extends React.Component {
    constructor() { // console.log('index-constructor');
        super();
        this.state = { users: [ {} ], activeUser: {}, activeSession: false }
        this.fetchUsers = this.fetchUsers.bind( this );
        this.initiateActiveUser = this.initiateActiveUser.bind( this );
        this.calculateRank = this.calculateRank.bind( this );
        this.setRank = this.setRank.bind( this );
    }
    render() { console.log('index-render-this.state', this.state);
        return (
            <Router>
                <div>
                    <Route path="/" render={ () => <Home activeSession={ this.state.activeSession } /> } />
                        { !this.state.activeSession ?
                            <Switch>
                                <Route path="/create-user" render={ ( props ) => <CreateUser history={ props.history } fetchUsers={ this.fetchUsers } /> } />
                                <Route path="/login-user" render={ ( props ) => <LoginUser history={ props.history } fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                                {/* <Route path="/.+" component={ PageNotFound } /> */} <Route component={ PageNotFound } />
                            </Switch>
                        :
                            <div>
                                <UserSingle activeUser={ this.state.activeUser } />
                                <Switch>
                                    <Route path="/quiz" render={ ( props ) => <Quiz history={ props.history } fetchUsers={ this.fetchUsers } activeUser={ this.state.activeUser }  /> } />
                                    <Route path="/delete-user" render={ ( props ) => <DeleteUser history={ props.history } fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                                    <Route path="/edit-user" render={ ( props ) => <EditUser history={ props.history } fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                                    <Route path="/logout-user" render={ ( props ) => <LogoutUser history={ props.history } fetchUsers={ this.fetchUsers } users={ this.state.users } /> } />
                                    {/* <Route path="/.+" component={ PageNotFound } /> */} <Route component={ PageNotFound } />
                                </Switch>
                                
                            </div>
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
        // json.map( ( user, iteration ) => { if( user.active ) { this.setState( { activeUser: user, activeSession: true }, () => { return true } ); } } );
        json.map( ( user, iteration ) => { if( user.active ) { this.setState( { activeUser: user, activeSession: true }, () => { this.calculateRank() } ); } } );
    }
    calculateRank() { // console.log('index-calculateRank');
        let usersArray = [];
        let usersObject = this.state.users;
        usersObject.map( ( userObject, iteration ) => {
            usersArray.push( userObject );
        } );
        usersArray.sort( ( a, b ) => { return ( b.highScore - a.highScore ); } );

        let userRank = 1;
        usersArray[0].rank = userRank;
        for ( let i = 1; i < usersArray.length; i++ ) {
            if ( usersArray[i].highScore < usersArray[i - 1].highScore ) { userRank++; }
            usersArray[i].rank = userRank;
        }
        this.setRank( usersArray, usersObject );
    }
    setRank( usersArray, usersObject ) { // console.log('index-setRank');
        usersObject.map( ( userObject, iteration ) => {
            let userId = userObject._id
            let userArray = usersArray.filter( userObject => userObject._id === userId );
            usersObject[iteration].rank = userArray[0].rank;
        } );
        this.setState( { users: usersObject } )
    }
}
render(<App />, document.getElementById('app'));