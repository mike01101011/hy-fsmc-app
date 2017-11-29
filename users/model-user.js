// model > controller > app
'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ username: String, password: String, score: Number, rank: Number, active: Boolean });

module.exports = mongoose.model('User', UserSchema);