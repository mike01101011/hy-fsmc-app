// model > controller > app
'use strict';

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema( {
	number: Number,
	season: String,
	difficulty: String,
	type: String,
	question: String,
	answer: String
} );

module.exports = mongoose.model('Question', QuestionSchema);