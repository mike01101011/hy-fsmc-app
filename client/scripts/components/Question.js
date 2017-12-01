import React from 'react';

// const Question = ( props ) => {
class Question extends React.Component {
    constructor() { // console.log('question-constructor');
        super();
        this.state = { answer: '', correct: false };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }	
	render() { console.log('question-render-this.state', this.state);
		console.log( 'this.props.id', this.props.id );
		return(
			<div>
				{/* <p>{ this.props.question }</p> */}
				<form onSubmit={ this.handleSubmit }>
					<input id={ this.props.id } onChange={ this.handleChange } name="answer" type="text" placeholder="Enter answer" value={ this.state.answer } />
                    <button>Check Answer</button>
                    <label htmlFor={ this.props.id } >{ this.props.question }</label>
	            </form>
			</div>
		);
	}
	handleChange( e ) { // console.log('question-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) { // console.log('question-handleSubmit');
        e.preventDefault();
        if ( this.state.answer === this.props.answer ) {
        	this.setState( { correct: true } )
        }
    }
}

export default Question;