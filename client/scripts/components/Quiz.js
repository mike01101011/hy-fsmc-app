// x > x
import React from 'react';

import Question from './Question.js';

class Quiz extends React.Component {
    constructor() { // console.log('quiz-constructor');
        super();
        this.state = { questions: [] };
    }
    render() { console.log('quiz-render-this.state', this.state);
        return (
            <div>
                <h2>Quiz</h2>
                { this.state.questions.map( ( question, iteration ) => {
                    return ( <Question key={ question._id } id={ question._id } question={ question.question } answer={ question.answer } /> );
                } ) }
            </div>
        );
    }
    componentDidMount() { //console.log('quiz-componentDidMount');
        this.fetchQuestions();
    }
    fetchQuestions() { // console.log('quiz-fetchQuestions');
        fetch( '/api/questions' ).then( resp => resp.json() ).then( json => {
            this.setState( { questions: json } );
            // this.setupQuiz( json );
        } );
    }
}
export default Quiz;