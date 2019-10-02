// const Cart = require('../models/Cart');
const User = require('../../users/model/User')


module.exports = {

    addEventToCart: (req) => {
        
        return new Promise((resolve, reject) => {
        User.findOne({ _id: req.params.owner})
            .then( user => {

                user.cart.events.push({

                event: req.body.item,
                quantity: parseInt(req.body.quantity),
                price: parseFloat(req.body.price)
                

                })

                user.cart.total = (user.cart.total + parseFloat(req.body.price)).toFixed(2)
                
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
            .populate('events.event')
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
        return new Promise((resolve, reject) => {
        User.findOne({ _id: req.params.owner})
            .then(user => {
                let eventIndex = user.cart.events.indexOf(req.body.event);
                user.cart.events.splice(eventIndex, 1);

                user.cart.total = (user.cart.total - parseFloat(req.body.price).toFixed(2))
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
                
                reject(errors)
            })
            }
    )}
}