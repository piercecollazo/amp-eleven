const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports = {
    signupAndSignIn: (params) => {
        console.log(params)
        return new Promise((resolve, reject) => {

            User.findOne({email: params.email})
                .then( user => {
                    if (!user) {

                        const newUser = new User({ 
                                            email: params.email,
                                            username: params.username, 
                                            password: params.password,
                                            creator: params.creator,
                                            follows: params.follows,
                                            followers: params.followers,
                                            events: params.events,
                                            verified: params.verified

                                        })
                        bcrypt.genSalt(10, (err, salt) => {

                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) 
                                    throw err;
                                newUser.password = hash;
                                // resolved user save
                                newUser.save()
                                       .then( user => {
                                        //    added a payload to sign tokens with to stop returning null tokens
                                        const payload = {
                                            id: user._id,
                                            email: user.email
                                        }

                                        jwt.sign(payload, process.env.SECRET_KEY, {
                                            expiresIn: 3600
                                        }, (err, token) => {
                                            if (err) {
                                                reject(err)
                                            } else {
                                                let success = {}
                                                success.confirmation = true;
                                                success.token = `Bear ${token}`
                                                resolve(success);
                                            }
                                        })
                                       })
                                       .catch(error => {

                                            let errorObj = {}
                                            errorObj.status = 400;
                                            errorObj.message = error;
                                            reject(errorObj)
                    
                                       });
                            })

                        });              

                    } else {
                        

                        bcrypt
                            .compare(params.password, user.password)
                            .then( isMatch => {
                                // corrected isMatch condition for if statementline 68
                                // Added token signature line 73
                                if (isMatch) {
                                    const payload = {
                                        id: user._id, 
                                        email: user.email
                                    }

                                    jwt.sign(payload, process.env.SECRET_KEY, {
                                        expiresIn: 3600
                                    }, (err, token) => {
                                        if (err) {
                                            reject(err)
                                        } else {
                                            let success = {};
                                            success.token = `Bearer ${token}`
                                            resolve(success)
                                        }
                                    })
    
                                } else {
                                    let errorObj = {}
                                    errorObj.status = 401;
                                    errorObj.message = 'Check your username and password';
                                    reject(errorObj)
                                }

                              

                            })
                            .catch( error => {
                                let errorObj = {}
                                errorObj.status = 400;
                                errorObj.message = error;
                                reject(errorObj)
                            })



                    }
                })
                .catch(error => {

                    let errorObj = {}
                    errorObj.status = 400;
                    errorObj.message = error;
                    reject(errorObj)

                })



        })

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

    follow: (following, user1)=>{
        //follower
        return new Promise((resolve, reject) => {
            User.findOne({_id: user1})
                .then(user =>{
            
                    user.follows.push({
                      id: following
                    })
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
                })
                .catch(error =>{
                    let errors = {}
                    errors.message = error
                    errors.status  = 400
                    reject(errors)   
                })
                .then(
            User.findOne({_id: following})
                .then(user =>{
                    user.followers.push({
                      id: user1
                    })
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
                })
                .catch(error =>{
                    let errors = {}
                    errors.message = error
                    errors.status  = 400
                    reject(errors)   
                })

                )

    })
}

}