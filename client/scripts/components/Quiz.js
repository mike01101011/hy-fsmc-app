// index > quiz
import React from 'react';
import Question from './Question.js';
import Score from './Score.js';

class Quiz extends React.Component {
    constructor() { // console.log('quiz-constructor');
        super();
        this.state = { questions: [], question: {}, answer: '', currentQuestion: null, totalQuestions: null, score: null };
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.fetchQuestions = this.fetchQuestions.bind( this );
        this.questionSetup = this.questionSetup.bind( this );
        this.nextQuestion = this.nextQuestion.bind( this );
    }
    render() { // console.log('quiz-render-this.state', this.state);
        return (
            <div>
            { this.state.currentQuestion === this.state.totalQuestions && this.state.currentQuestion != null ?
                <Score history={ this.props.history } score={ this.state.score } totalQuestions={ this.state.totalQuestions } activeUser={ this.props.activeUser } fetchUsers={ this.props.fetchUsers } />
            :
                <div>
                    <h2>Quiz</h2>
                    <p>Question { this.state.currentQuestion + 1 } of { this.state.totalQuestions }</p>
                    <form onSubmit={ this.handleSubmit }>
                        <input id={ this.props.id } onChange={ this.handleChange } name="answer" type="text" placeholder="Enter answer" value={ this.state.answer } />
                        <button>Check</button>
                        { this.state.questions.map( ( question, iteration ) => {
                            if ( iteration === this.state.currentQuestion ) {
                                return ( <Question key={ question._id } id={ question._id } question={ question.question } /> );
                            }
                        } ) }
                    </form>
                </div>
            }
            </div>
        );
    }
    componentDidMount() { // console.log('quiz-componentDidMount');
        this.fetchQuestions();
    }
    fetchQuestions() { // console.log('quiz-fetchQuestions');
        fetch( '/api/questions' ).then( resp => resp.json() ).then( ( json )  => { this.setState( { questions: json }, () => { this.questionSetup(); } ); } );
    }
    questionSetup() {
        this.setState( { totalQuestions: this.state.questions.length, currentQuestion: 0 }, () => { this.nextQuestion(); } );
    }
    nextQuestion() {
        this.setState( { question: this.state.questions[ this.state.currentQuestion ] } );
    }
    handleChange( e ) { // console.log('question-handleChange');
        this.setState( { [ e.target.name ]: e.target.value } );
    }
    handleSubmit( e ) { // console.log('question-handleSubmit');
        e.preventDefault();
        let score = this.state.score;
        if ( this.state.answer === this.state.question.answer ) { score += 1; }
        this.setState( { score: score, answer: '', currentQuestion: (this.state.currentQuestion + 1) }, () => { this.nextQuestion(); } );        
    }
}
export default Quiz;