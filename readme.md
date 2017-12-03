import-users: node ./users/import-users.js
import-questions: node ./questions/import-questions.js

model > controller > app

npm install
npm install react-router-dom --save
npm install mongoose --save
npm install body-parser --save-dev

nodemon app.js
node import-questions.js
node import-users.js
gulp
mongo

nf start

CALLBACK
this.setState( { activeUser: user }, () => { console.log( this.state.activeUser ) } );

IS EMPTY FUNCTION
function isEmpty( obj ) {
    for( var key in obj ) {
        if( obj.hasOwnProperty( key ) ) { return false; }
    }
    return true;
}

SCORE SORT
var players = {
  player1: { nickname: "Bob", score: 100 },
  player2: { nickname: "Amy", score: 200 },
  player3: { nickname: "Grant", score: 300 },
  player4: { nickname: "Steve", score: 200 },
  player5: { nickname: "Joe", score: 500 }
};
var array = [];
var rank = 1;

for (var key in players) { array.push(players[key]); }

array.sort( ( a, b ) => { return ( b.score - a.score; ); } );

array[0].rank = rank;

for (var i = 1; i < array.length; i++) {
  if (array[i].score < array[i - 1].score) { rank++; }
  array[i].rank = rank;
} 

console.log(array);