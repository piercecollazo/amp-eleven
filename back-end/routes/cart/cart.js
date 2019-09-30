let express = require('express');
let router  = express.Router();

let stripe = require('stripe')('sk_test_5zPUKi7gHghPzCEhWfDd5fQl00XivGJYfX')
let async = require('async');

// let Cart = require('./models/Cart')
let User = require('../users/model/User')

let cartController = require('./controllers/cartController')

router.get('/', cartController.getUserShoppingCart);


router.post('/product', cartController.addEventToCart);

router.delete('/remove', cartController.removeEvent);

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
                    (callback) => {
                        Cart.findOne({ 
                            owner: req.user._id 
                        }, (error, cart) => {
                            callback(error, cart)
                        })
                    },
                    (cart, callback) => {
                        User.findOne({
                            _id: req.user._id
                        }, (error, user) => {
                            if (user) {
                                for (let i = 0; i < cart.items.length; i++) {
                                    user.history.push({
                                        item: cart.items[i].item,
                                        paid: cart.items[i].price
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
                        Cart.update({
                            owner: req.user._id
                        }, {
                            $set: {
                                items: [],
                                total: 0
                            }
                        }, (error, updated) => {
                            if (updated) res.render('cart/paydone')
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