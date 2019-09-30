let express = require('express')
let router  = express.Router()

let categoryController = require('./controller/categoryController')
let createEventController = require('./controller/createEventController')
let categoryValidation = require('./utils/categoryValidation')

let Event = require('../event/models/Event')

router.get('/', function (req, res) {
    res.render('admin/admin.ejs')
})

//Add-Category

router.get('/add-category', function (req, res) {
    res.render('event/addcategory',
     { errors:  'addCategoryError', 
       success: 'addCategorySuccess' }
    )
})

router.post('/add-category', categoryValidation, function (req, res) {
    categoryController.addCategory(req.body)
                .then(category => {
                    // req.flash('addCategorySuccess', `Added ${ category.name }!`)

                    res.redirect('/admin/add-category')
                })
                .catch(error => {
                    // req.flash('addCategoryError', error.message)

                    res.redirect('/admin/add-category')
                })
})

router.get('/get-all-categories', categoryController.getAllCategories)

router.post('/create-event/:categoryName/:categoryID', createEventController.createEventByCategoryID)

module.exports = router