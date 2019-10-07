let express = require('express');
let router  = express.Router();

let stripe = require('stripe')('sk_test_5zPUKi7gHghPzCEhWfDd5fQl00XivGJYfX')
let async = require('async');

let User = require('../users/model/User')

let cartController = require('./controllers/cartController')

router.post('/add-event/:owner', function (req,res) { 
    // console.log(req)
    cartController.addEventToCart(req)
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.status(error.status).json(error)
    })
})

router.post('/remove/:owner', function (req,res) { 
    // console.log(req)
    cartController.removeEvent(req)
    .then(user => {
        res.json(user)
    })
    .catch(error => {
        res.status(error.status).json(error)
    })
}) 
   

router.post('/payment', (req, res, next) => {
    let stripeToken    = req.body.stripeToken
    let currentCharges = req.body.stripeMoney * 100

    stripe.customers
            .create({
                source: stripeToken
            })
            .then( customer => {
                let results = stripe.charges.create({
                    amount: currentCharges,
                    currency: 'usd',
                    customer: customer.id
                })

                return results
            })
            .then( results => {
                async.waterfall([
                    // (callback) => {
                    //     User.findOne({ 
                    //         owner: req.user._id 
                    //     }, (error, user) => {
                    //         callback(error, user)
                    //     })
                    // },
                    (callback) => {
                        User.findOne({
                            _id: req.user._id
                        }, (error, user) => {
                            if (user) {
                                for (let i = 0; i < user.items.length; i++) {
                                    user.history.push({
                                        item: user.items[i].item,
                                        paid: user.items[i].price
                                    })
                                }

                                user.save((error, user) => {
                                    if (error) return next(error)

                                    callback(error, user)
                                })
                            }
                        })
                    },
                    (user) => {
                        User.update({
                            owner: req.user._id
                        }, {
                            $set: {
                                items: [],
                                total: 0
                            }
                        }, (error, updated) => {
                            if (updated) res.render('user/paydone')
                        })
                    }
                ])
            })
            .catch( error => {
                let errors     = {}
                errors.status  = 500
                errors.message = error

                res.json(errors)
            })
})

module.exports = router;