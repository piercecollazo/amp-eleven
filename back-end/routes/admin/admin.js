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
                    res.json(category)
                    console.log('Category succesfully created')
                })
                .catch(error => {
                    res.status(error.status).json(error)
                })
                    
})

router.get('/get-all-categories', categoryController.getAllCategories)

router.post('api/create-event/:categoryName/:categoryID', function (req, res){
    createEventController.createEventByCategoryID(req.body)
    .then(newEvent=> {
        res.json(newEvent)
        console.log('New event created')
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = router