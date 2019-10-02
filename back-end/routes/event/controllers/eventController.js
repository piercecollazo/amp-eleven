let Event = require('../models/Event')

module.exports = {
    
        getAllEvents: (params) => {
            return new Promise((resolve, reject) => {
                Event.find(params)
                        .then(events => {
                            resolve(events)
                        })
                        .catch( error => {
                            let errors     = {}
                            errors.status  = 500
                            errors.message = error
    
                            reject(errors)
                        })
            })
        },
        getEventByID: (id) => {
            return new Promise((resolve, reject) => {
                Event.findById(id)
                        .then(event => {
                            resolve(event)
                        })
                        .catch( error => {
                            let errors     = {}
                            errors.status  = 500
                            errors.message = error
    
                            reject(errors)
                        })
            })
        },
        getEventsByCategoryID: (id) => {
            return new Promise((resolve, reject) => {
                Event.find({category: id})
                        .populate('category')
                        .exec()
                        .then( events => {
                            resolve(events)
                        })
                        .catch( error => {
                            let errors     = {}
                            errors.status  = 500
                            errors.message = error
    
                            reject(errors)
                        })
            })
        },
        // getPageIfUserLoggedIn: (req, res, next) => {
        //     // res.render('product/index-product')
        //     if (req.user) paginate(req, res, next)
        //     else res.render('product/index-product')
        // },
        searchEventByQuery: (req, res) => {
            if (req.query.q) {
                Event.search({
                    query_string: {
                        query: req.query.q
                    }
                }, (error, results) => {
                    if (error) {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = error
    
                        res.status(errors.status).json(errors)
                    } else {
                        let data = results.hits.hits
                        console.log(data)
                    }
                })
            }
        },
        instantSearch: (req, res) => {
            // console.log(req)
            Event.search({
                query_string: {
                    query: req.body.search_term
                }
            }, (error, result) => {
                if (error) {
                    let errors     = {}
                    errors.status  = 500
                    errors.message = error
    
                    res.status(errors.status).json(errors)
                } else {
                    res.json(result)
                }
            })
        }
}