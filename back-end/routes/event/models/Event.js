let mongoose = require('mongoose')
let mongoosastic = require('mongoosastic')

let EventSchema = new mongoose.Schema({
        
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            es_type: 'nested',
            es_include_in_parent: true
        },
        creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        event: { type: String, es_type: 'text', default: ''},
        date: { type: Number, es_type: 'long', default: 0 },
        location: {type: String, es_type: 'text', default: ''},
        venue: {type: String, es_type: 'text', deafult: ''},
        price: {type: String, es_type: 'text', default: ''}
})

EventSchema.plugin(mongoosastic, {
    hosts: [
        "localhost:9200"
    ],
    populate: [
        {
            path:'category'
        }
    ]
})

module.exports = mongoose.model('event', EventSchema)