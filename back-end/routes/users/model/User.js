const mongoose =  require('mongoose');
const moment   =  require('moment');
let Schema     = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email:      {type: String, default:''},
    password:   { type: String, default: ''},
    creator:    {type: Boolean, default: false},
    follows:    {type: Array, default: []},
    followers:  {type: Array, default: []},
    events:     {type: Array, default: []},
    verified:   {type: Boolean, default: false},

    //Profile:
    profile: {
        username: { type: String, default: ''},
        picture: { type: String, default: ''}
    },

    //Cart for Events:
    cart: {
    total: { type: Number, default: 0 },
    items: [{
        item:       { type: Schema.Types.ObjectId, ref: 'event' },
        quantity:   { type: Number, default: 1 },
        price:      { type: Number, default: 0 }
    }]},
    
    history: [
        {
            paid: { type: Number, default: 0 },
            item: { type: Schema.Types.ObjectId, ref: 'event' }
        }
    ],

    timestamp:  { type: String, default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a') }
});

module.exports = mongoose.model('user', UserSchema)