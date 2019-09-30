let express = require('express');
let router  = express.Router();

let stripe = require('stripe')('sk_test_5zPUKi7gHghPzCEhWfDd5fQl00XivGJYfX')
let async = require('async');

let Cart = require('./models/Cart')
let User = require('../users/model/User')

// let cartController = require('./controllers/cartController')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  })



module.exports = router;