let Event = require('../models/Event')

module.exports = {
    
        getAllEvents: (req, res) => {
            // console.log(params)
            return new Promise((resolve, reject) => {
                Event.find({})
                        .then(events => {
                            resolve(events)
                            console.log(events)
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
        }
        ,
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