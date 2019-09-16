var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('./controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Home');
});

router.post('/signupandlogin', function(req, res) {

    userController.signupAndLogIn(req.body)
                  .then( user => {
                    res.json(user);
                  })
                  .catch( error => {
                    res.status(error.status).json(error);
                  })
  
  });
  
  router.post('/login', function(req, res) {
    userController.login(req.body)
    .then( user => {
      res.json(user);
    })
    .catch( error => {
      res.json(error);
    })
  })
  
  module.exports = router;

module.exports = router;
