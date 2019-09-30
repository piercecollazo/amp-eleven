let Event = require('../../event/models/Event')
// let faker   = require('faker')

module.exports = {
    createEventByCategoryID: (req, res) => {

            console.log(req.params)
        
            let newEvent = new Event()
    
            newEvent.category = req.params.categoryID
            newEvent.name     = req.params.categoryName
            newEvent.price    = req.params.price
            newEvent.image    = req.params.image
    
            newEvent.save()
       

        // req.flash('createProductsSuccess', `Fake ${ req.params.categoryName } 10 products created!`)

        res.redirect('/admin/get-all-categories')
    }
}