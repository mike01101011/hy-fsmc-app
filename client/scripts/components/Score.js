// index > quiz > score
import React from 'react';

class Score extends React.Component {
	constructor() { // console.log('Score-constructor');
	    super();
	    this.state = { activeUser: {} };
	    this.handleSubmit = this.handleSubmit.bind( this );
	    this.updateUserScore = this.updateUserScore.bind( this );
	}
	render() { // console.log('Score-render-this.state', this.state);
		return(
			<div>
			    <h2>Score</h2>
				<p>{ this.props.score } correct out of { this.props.totalQuestions }</p>
			    <form onSubmit={ this.handleSubmit }>
			        <button>Finish</button>
			    </form>
			</div>
		);
	}
	handleSubmit( e ) { // console.log('Score-handleSubmit');
	    e.preventDefault();
	    this.setState( { activeUser: this.props.activeUser }, () => { this.updateUserScore( this.state.activeUser ); } );
	}
	updateUserScore( activeUser ) { // console.log('EditUser-updateUser');
        const updatedUser = Object.assign( {}, activeUser );
        if( this.props.score > updatedUser.highScore ) { updatedUser.highScore = this.props.score; }
        fetch( `/api/users/${ activeUser._id }`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( updatedUser ) } ).then( () => this.props.fetchUsers() );
        this.setState( { activeUser: {} }, () => { this.props.history.push(`/`); } );
    }
}

export default Score;