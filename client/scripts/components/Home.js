import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = ( props ) => {
	return(
		<header>
	        <h1>App</h1>
				{ !props.activeSession ?
					<ul>
			            <li><NavLink to="/create-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Create User</NavLink></li>
			            <li><NavLink to="/login-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Login User</NavLink></li>
			        </ul>
				:
		            <ul>
		            	<li><NavLink to="/delete-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Delete User</NavLink></li>
		            	<li><NavLink to="/edit-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Edit User</NavLink></li>
		            	<li><NavLink to="/logout-user" activeStyle={ { color: 'yellow' } }  activeClassName="">Logout User</NavLink></li>
		            </ul>
				}
	    </header>
	);
}

export default Home;