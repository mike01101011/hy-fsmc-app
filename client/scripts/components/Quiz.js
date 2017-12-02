// x > x
import React from 'react';

import Question from './Question.js';
import Score from './Score.js';

class Quiz extends React.Component {
    constructor() { // console.log('quiz-constructor');
        super();
        this.state = { questions: [], question: {}, answer: '', currentQuestionNumber: null, numberOfQuestions: null, score: null };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.fetchQuestions = this.fetchQuestions.bind( this );
        this.numberOfQuestions = this.numberOfQuestions.bind( this );
        this.currentQuestion = this.currentQuestion.bind( this );
    }
    render() { console.log('quiz-render-this.state', this.state);
        return (
            <div>
            { this.state.currentQuestionNumber === this.state.numberOfQuestions && this.state.currentQuestionNumber != null ?
                <Score score={ this.state.score } numberOfQuestions={ this.state.numberOfQuestions } history={ this.props.history } />
            :
                <div>
                    <h2>Quiz</h2>
                    <p>Question { this.state.currentQuestionNumber + 1 } of { this.state.numberOfQuestions }</p>
                    <form onSubmit={ this.handleSubmit }>
                        <input id={ this.props.id } onChange={ this.handleChange } name="answer" type="text" placeholder="Enter answer" value={ this.state.answer } />
                        <button>Check</button>
                        { this.state.questions.map( ( question, iteration ) => {
                            if ( iteration === this.state.currentQuestionNumber ) {
                                return ( <Question key={ question._id } id={ question._id } question={ question.question } /> );
                            }
                        } ) }
                    </form>
                </div>
            }
            </div>
        );
    }
    componentDidMount() { //console.log('quiz-componentDidMount');
        this.fetchQuestions();
    }
    fetchQuestions() { // console.log('quiz-fetchQuestions');
        fetch( '/api/questions' ).then( resp => resp.json() ).then( json => { this.setState( { questions: json } ); } )
        .then( () => { this.numberOfQuestions(); } );
    }
    numberOfQuestions() {
        this.setState( { numberOfQuestions: this.state.questions.length, currentQuestionNumber: 0 }, () => { this.currentQuestion(); } );
    }
    currentQuestion() {
        this.setState( { question: this.state.questions[ this.state.currentQuestionNumber ] } );
    }
    handleChange( e ) { // console.log('question-handleChange');
        this.setState( { [ e.target.name ]: e.target.value, } );
    }
    handleSubmit( e ) { // console.log('question-handleSubmit');
        e.preventDefault();
        let score = this.state.score;
        if ( this.state.answer === this.state.question.answer ) { score += 1; }
        this.setState( { score: score, answer: '', currentQuestionNumber: (this.state.currentQuestionNumber + 1) }, () => { this.currentQuestion(); } );        
    }
}
export default Quiz;