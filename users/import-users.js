const mongoose = require('mongoose');
const User = require('./model-user.js');

mongoose.connect('mongodb://localhost/app');

const users = [
    { username: 'user1', password: 'pass1', highScore: 0, rank: 0, active: false },
    { username: 'user2', password: 'pass2', highScore: 0, rank: 0, active: false },
    { username: 'user3', password: 'pass3', highScore: 0, rank: 0, active: false },
    { username: 'user4', password: 'pass4', highScore: 0, rank: 0, active: false },
    { username: 'user5', password: 'pass5', highScore: 0, rank: 0, active: false },
]

// Drop any existing data inside of the questionss table
User.remove( {}, () => { console.log('All users removed'); });

users.forEach((user) => {
    const model = new User();
    Object.assign(model, user);
    model.save((err, doc) => { !err ? console.log(doc) : console.log(err); });
    return;
});