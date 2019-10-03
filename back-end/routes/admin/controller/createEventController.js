let Event = require('../../event/models/Event')
// let faker   = require('faker')

module.exports = {
    createEventByCategoryID: (params) => {
        return new Promise((resolve, reject) =>{
            // console.log(params)
        
            let newEvent = new Event()
    
            newEvent.category = params.params.categoryID
            // newEvent.name     = req.params.categoryName

            newEvent.creator  = params.body.creator
            newEvent.event    = params.body.event
            newEvent.date     = params.body.date
            newEvent.location = params.body.location
            newEvent.venue    = params.body.venue
            newEvent.price    = params.body.price
    
            newEvent.save()
                .then( newEvent => {
                    resolve(newEvent)
                })
                .catch( error =>{
                    let errors = {}
                    errors.status = 400
                    errors.message = error;

                    reject(errors)
                })
    })
}
}

