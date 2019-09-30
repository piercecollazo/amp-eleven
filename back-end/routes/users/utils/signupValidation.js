function userValidation(req, res, next) {
    req.checkBody('name',       'Name is Required!').notEmpty();
    req.checkBody('email',      'Email is Required!').notEmpty();
    req.checkBody('password',   'Password is Required!').notEmpty();

    next()
}

module.exports = userValidation