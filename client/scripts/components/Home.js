import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const Home = (props) => {
	return(
		<Router>
			<div>
				{ !props.activeSession ?
					<div>
					    <header>
					        <h1>App</h1>
					        <ul>
					            <li><NavLink to="/create-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Create User</NavLink></li>
					            <li><NavLink to="/login-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Login User</NavLink></li>
					        </ul>
					    </header>
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
					</div>
				}
			</div>
		</Router>
	);
}

export default Home;