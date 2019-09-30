let Product = require('../../event/models/Event')
// let faker   = require('faker')

module.exports = {
    createProductByCategoryID: (req, res) => {
        for (let i = 0; i < 10; i++) {
            let newEvent = new Event()
    
            newEvent.category = req.params.categoryID
            newEvent.name     = faker.commerce.productName()
            newEvent.price    = faker.commerce.price()
            newEvent.image    = faker.image.image()
    
            newEvent.save()
        }

        // req.flash('createProductsSuccess', `Fake ${ req.params.categoryName } 10 products created!`)

        // res.redirect('/admin/get-all-categories')
    }
}