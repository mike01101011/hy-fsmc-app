// model > controller > app
const Question = require('./model-question.js');
const questions = {};

questions.getQuestions = ( req, res ) => { console.log('controller.js-----------movies.GETQuestions'); // http://localhost:8080/api/quesitons
        Question.find( function( err, docs ) {
            if( err ) { res.status( 400 ).send( err ); }
            else { res.status( 200 ).send( docs ); }
        } );
};

module.exports = questions;