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

*remove UserSingle.js from EditUser.js*