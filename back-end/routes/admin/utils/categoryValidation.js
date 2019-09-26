function categoryValidation(req, res, next) {
    req.checkBody('name', 'Category cannot be empty').notEmpty()

    let errorValidate = req.validationErrors()

    if (errorValidate) {
        req.flash('addCategoryError', errorValidate[0].message)
        res.status(302).redirect('/admin/add-category')
    } else {
        next()
    }
}

module.exports = categoryValidation