let express = require('express');
let router  = express.Router();

// let stripe = require('stripe')
// let async = require('async');

let Cart = require('./models/Cart')
let User = require('../users/model/User')

let cartController = require('./controllers/cartController')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })
module.exports = router;