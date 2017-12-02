// index > quiz > score
import React from 'react';

class Score extends React.Component {
	constructor() { // console.log('Score-constructor');
	    super();
	    this.state = {};
	    this.handleSubmit = this.handleSubmit.bind( this );
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
	    this.props.history.push(`/`);
	}
}

export default Score;