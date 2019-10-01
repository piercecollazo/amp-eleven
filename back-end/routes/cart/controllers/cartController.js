// const Cart = require('../models/Cart');
const User = require('../../users/model/User')


module.exports = {
    // createUserCart: (req, res) => {
    //     let cart = new Cart()
        
    //     cart.owner = req.user.user_id

    //     cart.save((error) => {
    //         if (error) {
    //             res.status(400).json({
    //                 confirmation: 'failure',
    //                 message: error
    //             })
    //         } else {
    //             res.redirect('/')
    //         }
    //     })
    // },

    addEventToCart: (req) => {
        // console.log(owner)
        return new Promise((resolve, reject) => {
        User.findOne({ _id: req.params.owner})
            .then( user => {

                console.log(user.cart.items)
                console.log(req.body)

                user.cart.items.push({

                item: req.body.item,
                quantity: parseInt(req.body.quantity),
                price: parseFloat(req.body.price)
                

                })

                // user.cart.total = (user.cart.total + parseFloat(req.body.price)).toFixed(2)
                
                user.save()
                    .then( user => {
                        resolve(user)
                    })
                    .catch( error => {
                        let errors = {}
                        errors.status = 400
                        errors.message = error
                        reject(errors)
                    })
            })
            .catch( error => {
                let errors = {}
                errors.status = 400
                errors.message = error
                
            })
        })
    },
    getUserShoppingCart: (req, res) => {
        User.findOne({ owner: req.user_id})
            .populate('items.item')
            .exec()
            .then( user => {
                res.render('user/cart', {
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
        User.findOne({ owner: req.user._id})
            .then(user => {
                user.cart.items.pull(String(req.body.item))

                user.cart.total = (user.cart.total - parseFloat(req.body.price).toFixed(2))

                user.save()
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