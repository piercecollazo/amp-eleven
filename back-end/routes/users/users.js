var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('./controller/userController');
var signupValidation = require('./utils/signupValidation');


/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.send('Users Home');
});

/* Sign-up */

router.post('/api/sign-up', signupValidation, function(req, res) {
    console.log('sign up attempt made')
    userController.signup(req.body)
        .then( user=> {
            res.json(user);
            console.log('sign up of user successful')
        })
        .catch ( error => {
            res.status(error.status).json(error);
        })
                    .then( user => {
                        res.json(user);
                        console.log('sign up of user successful')
                    })
                    .catch ( error => {
                        res.status(error.status).json(error);
                    })
});

/* Sign-in */

router.post('/api/sign-in', function(req, res) {
    userController.signin(req.body)
    .then( user => {
      console.log(user)
        res.json(user);
    })
    .catch( error => {
        res.status(error.status).json(error);
    })
});

/* Get User */

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

/* Follow */

router.post('/api/follow/:otheruserid/:userid', function(req,res){
    userController.follow(req.params.otheruserid, req.params.userid)
    .then(user => {
        res.json(user)
      })
      .catch(error => {
        res.status(error.status).json(error)
      })
})

/* Update Profile */

router.post('/api/edit-profile', function (req, res) {
    userController.updateProfile(req.body, req.user._id)
                    .then(user => {
                        res.json(user)
                    })
                    .catch(error => {
                        res.json(error)
                    })
})
  
module.exports = router;
