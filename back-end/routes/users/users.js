var express = require('express');
var router = express.Router();
var passport = require('passport');

var userController = require('./controller/userController');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  res.send('Users Home');
});

router.post('/api/sign-up', function(req, res) {
    console.log(req.body)
    userController.signup(req.body)
                    .then( user => {
                        res.json(user);
                    })
                    .catch ( error => {
                        res.status(error.status).json(error);
                    })
});

router.post('/api/sign-in', function(req, res) {
    console.log(req.body)
    userController.signin(req.body)
    .then( user => {
        res.json(user);
    })
    .catch( error => {
        res.status(error.status).json(error);
    })
});

// router.post('/api/signupandsignin', function(req, res) {

//     userController.signupAndSignIn(req.body)
//                   .then( user => {
//                     res.json(user);
//                   })
//                   .catch( error => {
//                     res.status(error.status).json(error);
//                   })
  
//   });

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

router.post('/api/follow/:followerid/:followedid', function(req,res){
    userController.follow(req.params.followerid, req.params.followedid)
    .then(user => {
        res.json(user)
      })
      .catch(error => {
        res.status(error.status).json(error)
      })
})
  
module.exports = router;
