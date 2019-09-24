var express = require('express');
var router  = express.Router();

let eventController = require('./controllers/eventController');

let Event = require('./models/Event');

module.exports = router
