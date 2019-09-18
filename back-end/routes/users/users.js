var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('./controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Home');
});

router.post('/api/signupandsignin', function(req, res) {

    userController.signupAndSignIn(req.body)
                  .then( user => {
                    res.json(user);
                  })
                  .catch( error => {
                    res.status(error.status).json(error);
                  })
  
  });

router.get('/api/profile/:id', function(req,res){
  // params are a placeholder for manual id fetching in postman
  userController.getUser(req.params.id)
                .then(user => {
                  res.json(user)
                })
                .catch(error => {
                  res.status(error.status).json(error)
                })
})
  
module.exports = router;
