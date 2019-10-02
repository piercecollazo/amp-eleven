const User = require('../model/User');
const bcrypt = require('bcryptjs');
const gravatar = require('../utils/gravatar')
const jwt = require('jsonwebtoken');

module.exports = {

    signup: (params) => {

        console.log(params)

        return new Promise((resolve, reject) => {

            User.findOne({email: params.email})
                .then(user => {

                    if(user) {

                        let errorObj = {};
                        errorObj.status = 409;
                        errorObj.confirmation = false;
                        errorObj.message = `User already Exist! Please choose another name`;
                        reject(errorObj);

                    } else {

                        const newUser = new User
                        
                        newUser.email = params.email,
                        newUser.profile.username = params.username,
                        newUser.profile.picture = gravatar(params.email)
                        newUser.password = params.password,
                        newUser.creator = params.creator,
                        newUser.follows = params.follows,
                        newUser.followers = params.followers,
                        newUser.events = params.events,
                        newUser.verified = params.verified,
                        newUser.genres = params.genres

                    bcrypt.genSalt(10, (err, salt) => {
                    
                        bcrypt.hash(newUser.password, salt, (err, hash) => {

                            if (err) {
                                reject(err);
                                } else {
                                newUser.password = hash;
                                
                                newUser.save()
                                    .then ( user => {

                                    const payload = {
                                        id: user._id,
                                        email: user.email,
                                        username: user.username
                                    }

                                jwt.sign(payload, process.env.SECRET_KEY, {
                                    expiresIn: 3600
                                }, (err, token) => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        let success = {};
                                        success.confirmation = true;
                                        success.token = `Bearer ${token}`;
                                        resolve(success);
                                    }

                                    })

                                })
                                .catch( error => {
                                    reject(error);
                                })
                                }
                                
                            })
                            });
                        }
                    })
                    .catch( error => {
                        reject(error);
                    })
        });
    },

    signin: (params) => {
        console.log(params)
        const email = params.email;
        const password = params.password;

        return new Promise((resolve, reject) => {

            User.findOne({ email: email })
                .then(user => {
                    
                    if(!user) {
                        let errors = {}
                        errors.email = 'User not found! Please sign up';
                        errors.status = 400;
                        reject(errors)
                    } else {

                        bcrypt.compare(password, user.password)
                            .then( isMatch => {

                                if (isMatch) {
                                    const payload = {
                                        id: user._id,
                                        email: user.email,
                                        username: user.username,
                                        creator: user.creator,
                                        follows: user.follows,
                                        followers: user.followers,
                                        verified: user.verified,
                                        events: user.events
                                    }
                                    
                                    jwt.sign(payload, process.env.SECRET_KEY, {
                                        expiresIn: 3600
                                    }, (err, token) => {
                                        
                                        if(err) {
                                            reject(err)
                                        } else {
                                            let success = {};
                                            success.confirmation = true;
                                            success.token = `Bearer ${token}`;
                                            resolve(success);             
                                        }

                                    });
                                } else {
                                    let errors ={};
                                    errors.message = 'username not found or check your password!';
                                    errors.status = 400;
                                    reject(errors);
                                }

                            })
                            .catch (error => {
                                reject(error);
                            })
                    }
                })
                .catch( error => {
                    reject(error)
                })
        });
    },

    getUser: (id)=>{
        return new Promise((resolve, reject)=> {
            User.findOne({_id: id})
                .exec((error, user) =>{
                    if(error) reject(error)
                    else      resolve(user)
                })
        })
    },

    follow: (otheruserid, userid)=>{
    
        return new Promise((resolve, reject) => {
            User.findOne({_id: userid})
                .then(user =>{
                if (user.follows.includes(otheruserid) === false){
                    user.follows.push(otheruserid)
                    user.save()
                    .then(user => {
                        resolve(user)
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.message = error
                        errors.status  = 400
                        reject(errors)
                    })
                }
                else {
                    let followsIndex = user.follows.indexOf(otheruserid);
                    // console.log(followsIndex);
                    user.follows.splice(followsIndex, 1);
                    user.save()
                    .then(user => {
                        resolve(user)
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.message = error
                        errors.status  = 400
                        reject(errors)
                    })
                }
            })
                .catch(error =>{
                    let errors = {}
                    errors.message = error
                    errors.status  = 400
                    reject(errors)   
                })
                .then(
            User.findOne({_id: otheruserid})
                .then(user =>{
                    if (user.followers.includes(userid) === false ){
                    user.followers.push(userid)
                    user.save()
                    .then(user => {
                        resolve(user)
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.message = error
                        errors.status  = 400
                        reject(errors)
                    })
                } else {

                    let followersIndex = user.followers.indexOf(userid);
                    user.followers.splice(followersIndex, 1);
                    user.save()
                    .then(user => {
                        resolve(user)
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.message = error
                        errors.status  = 400
                        reject(errors)
                    })
                }
                })
                .catch(error =>{
                    let errors = {}
                    errors.message = error
                    errors.status  = 400
                    reject(errors)   
                })

                )

    })
},


updateProfile: (req, res) => {

        User.findOne({ _id: req.params.userid})
            .then(user => {
                console.log(req.body)
                if (req.body.username) user.profile.username = req.body.username
                if (req.body.email)       user.email = req.body.email
                if (req.body.password) {
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(req.body.password, salt, (error, hash) => {
                            if (error) {
                                let errors = {}
                                errors.message = error
                                error.status   = 400

                                // reject(errors)
                            } else {
                                user.password = hash

                                user.save()
                                    .then(user => {
                                        resolve(user)
                                    })
                                    .catch(error =>{
                                        let errors = {}
                                        errors.message = error
                                        errors.status  = 400
                                    })
                            }
                        })
                    })
                } else {
                    user.save()
                        .then(user => {
                            resolve(user)
                        })
                        .catch(error =>{
                            let errors = {}
                            errors.message = error
                            errors.status  = 400
                        })
                }
            })
}
}