const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, default:''},
    username: { type: String, default: ''},
    password: { type: String, default: ''},
    creator: {type: Boolean, default: false},
    follows: {type: Array, default: []},
    followers: {type: Array, default: []},
    events: {type: Array, default: []},
    verified: {type: Boolean, default: false}
});

module.exports = mongoose.model('user', UserSchema)