const User = require('/Users/codeimmersives/Desktop/current-app/amp-eleven/back-end/routes/users/model/User.js');
const Cart = require('../models/Cart');


module.exports = {
    createUserCart: (req, res) => {
        let cart = new Cart()
        console.log(req.body.email)

        User.findOne({email: req.body.email})
                .then(user => {

                    if(user) {

                        console.log(user)
                    }
                })

        cart.owner = user

        cart.save((error) => {
            if (error) {
                res.status(400).json({
                    confirmation: 'failure',
                    message: error
                })
            } else {
                res.redirect('/')
            }
        })
    },

    addEventToCart: (req, res) => {
        Cart.findOne({ owner: req.user._id})
            .then( cart => {
                cart.items.push({
                    item: req.body.eventID,
                    price: parseFloat(req.body.priceValue),
                    quantity: parseInt(req.body.quantity)
                })

                cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2)
                
                cart.save()
                    .then( cart => {
                        res.redirect('/api/cart')
                    })
                    .catch( error => {
                        let errors = {}
                        errors.status = 400
                        errors.message = error
                        
                        res.status(errors.status).json(errors)
                    })
            })
            .catch( error => {
                let errors = {}
                errors.status = 400
                errors.message = error
                
                res.status(errors.status).json(errors)
            })
    },
    getUserShoppingCart: (req, res) => {
        Cart.findOne({ owner: req.user_id})
            .populate('items.item')
            .exec()
            .then( cart => {
                res.render('cart/cart', {
                    foundCart: cart,
                    // message: req.flash('remove')
                })
            })
            .catch( error => {
                let errors = {}
                errors.status = 500
                errors.message = error
                
                res.status(errors.status).json(errors)
            })
    },
    removeEvent: (req, res) => {
        Cart.findOne({ owner: req.user._id})
            .then(cart => {
                cart.items.pull(String(req.body.item))

                cart.total = (cart.total - parseFloat(req.body.price).toFixed(2))

                cart.save()
                .then( cart => {
                    // req.flash('remove', 'Successfully removed')

                    res.redirect('/api/cart')
                })
                .catch( error => {
                    let errors = {}
                    errors.status = 500
                    errors.message = error
                    
                    res.status(erros.status).json(errors)
                })
            })
            .catch( error => {
                let errors = {}
                errors.status = 500
                errors.message = error
                
                res.status(errors.status).json(errors)
            })
    }
}