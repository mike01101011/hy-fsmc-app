const mongoose = require('mongoose');
const Question = require('./model-question.js');

mongoose.connect('mongodb://localhost/app');

const questions = [
    { number: 0, season: '3', difficulty: 'hard', type: 'word', question: 'Jerry: "Have you ever been through an audit? It’s hell. It’s the financial equivalent of a complete ______ examination."', answer: 'rectal' },
    { number: 1, season: '3', difficulty: 'hard', type: 'word', question: 'Elaine: "Boys are sick." Jerry:" Well what do girls do?" Elaine: "We just _____ someone till they develop an eating disorder."', answer: 'tease' },
    { number: 2, season: '3', difficulty: 'hard', type: 'who', question: '"That stinks. Can you smell that? You stink."', answer: 'Kramer' },
    { number: 3, season: '3', difficulty: 'easy', type: 'word', question: 'George: "No, come on, let me. I smashed your car, it cost you over $2000..." Jerry: "Yeah, a cup of ______ should cover it."', answer: 'coffee' },
    { number: 4, season: '3', difficulty: 'hard', type: 'word', question: 'Newman: "Nice game, ______ boy!"', answer: 'pretty' },
    { number: 5, season: '3', difficulty: 'hard', type: 'who', question: '"I don’t think you’ll throw up. SHE likes to throw up."', answer: 'Jerry' },
    { number: 6, season: '3', difficulty: 'hard', type: 'word', question: 'Elaine: "He said he was gonna sew your ___ to your face."', answer: 'ass' },
    { number: 7, season: '3', difficulty: 'hard', type: 'word', question: 'Jerry: "I like the button fly. That is one place on my wardrobe I do not need sharp, interlocking metal _____."', answer: 'teeth' },
    { number: 8, season: '3', difficulty: 'hard', type: 'who', question: '"Are you sure you’re not pregnant?"', answer: 'Kramer' },
    { number: 9, season: '3', difficulty: 'hard', type: 'word', question: 'George: "You’re not really gonna go to California are you?" Kramer: "Up here, I’m already ____."', answer: 'gone' }
]

// Drop any existing data inside of the questionss table
Question.remove( {}, () => { console.log('All questions removed'); });

questions.forEach((question) => {
    const model = new Question();
    Object.assign(model, question);
    model.save((err, doc) => { !err ? console.log(doc) : console.log(err); });
    return;
});