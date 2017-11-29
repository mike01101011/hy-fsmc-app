// model > controller > app
const express = require( 'express' );
const app = express();
const path = require( 'path' );
const mongoose = require( 'mongoose' );
const questions = require( './questions/controller-questions' );
const users = require( './users/controller-users' );
const bodyParser = require( 'body-parser' );

mongoose.connect( 'mongodb://localhost/app', { useMongoClient: true } );
app.use( bodyParser.json() )

// This serves all files placed in the /public directory (where gulp will build all React code)
// Also serve everything from our assets directory (static assets that you want to manually include)
app.use( express.static('public') );
app.use( express.static('assets') );

// Include your own logic here (so it has precedence over the wildcard route below)
app.get( '/api/questions', questions.getQuestions );

app.get( '/api/users', users.getUsers ); // localhost:8080
app.post( '/api/users', users.postUser ); // create-user
app.delete( '/api/users/:id', users.deleteUser );
app.put( '/api/users/:id', users.updateUser );
app.get( '/api/users/:id', users.getUserById );

// This route serves your index.html file (which initializes React)
app.get( '*', function( req, res, next ) { res.sendFile( path.join( __dirname,'index.html' ) ); } );

// Start your server, and listen on port 8080.
app.listen(8080, function() { console.log( "8App is now listening on port 8080!" ); })