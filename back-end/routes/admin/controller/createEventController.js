let Event = require('../../event/models/Event')
// let faker   = require('faker')

module.exports = {
    createEventByCategoryID: (req, res) => {

            // console.log(req.params)
        
            let newEvent = new Event()
    
            newEvent.category = req.params.categoryID
            newEvent.creator  = req.params.creator
            newEvent.event    = req.params.event
            newEvent.date     = req.params.date
            newEvent.location = req.params.location
            newEvent.venue    = req.params.venue
            newEvent.price    = req.params.price
    
            newEvent.save()
       

        // req.flash('createProductsSuccess', `Fake ${ req.params.categoryName } 10 products created!`)

        // res.redirect('/admin/get-all-categories')
    }
}