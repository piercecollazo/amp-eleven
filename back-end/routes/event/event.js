var express = require('express');
var router  = express.Router();

let eventController = require('./controllers/eventController');

let Event = require('./models/Event');

Event.createMapping(function (error, mapping) {
    if (error) {
        console.log('Error creating mapping')
        console.log(mapping)
    } else {
        console.log('Mapping created')
        console.log(mapping)
    }
})

let stream = Event.synchronize()
let count  = 0

stream.on('data', function () {
    count++
})

stream.on('close', function () {
    console.log(`Indexed ${ count } documents`)
})

stream.on('error', function () {
    console.log("30: Error: " + error)
})

// router.get('/', eventController.getPageIfUserLoggedIn);

// router.get('/page/:page', paginate);

router.post('/search', (req, res) => {
    res.redirect('/api/event/search?q=' + req.body.q)
})

router.get('/search', eventController.searchEventByQuery)

router.post('/instant-search', eventController.instantSearch)

router.get('/:id', function (req, res) {
    eventController.getEventByID(req.params.id)
                        .then( event => {
                            res.render('event/event', {
                                event: event
                            })
                        })
                        .catch( error => {
                            res.status(error.status).json(error)
                        })
})

router.get('/geteventsbycategoryid/:id', function (req, res) {
    eventController.getEventsByCategoryID(req.params.id)
                        .then(events => {
                            res.render('event/events', {
                                eventss: events
                            })
                        })
                        .catch( error => {
                            res.status(error.status).json(error)
                        })
})

module.exports = router
