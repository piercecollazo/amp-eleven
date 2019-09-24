let mongoose    = require('mongoose')
let Schema      = mongoose.Schema;

let CartSchema  = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'user'},
    total: { type: Number, default: 0},
    event: [{
        item:       {type: Schema.Types.ObjectId, ref: 'event'},
        quantity:   {type: Number, default: 1},
        price:      {type: Number, default: 0},
        fees:       {type: Number, default: 0},
        delivery_fees:   {type: Number, default: 0}
    }]
})

module.exports = mongoose.model('cart', CartSchema)