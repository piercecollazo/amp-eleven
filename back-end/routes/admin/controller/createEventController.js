let Event = require('../../event/models/Event')
// let faker   = require('faker')

module.exports = {
    createEventByCategoryID: (req, res) => {

            console.log(req.body)
        
            let newEvent = new Event()
    
            newEvent.category = req.params.categoryID
            // newEvent.name     = req.params.categoryName

            newEvent.creator  = req.body.creator
            newEvent.event    = req.body.event
            newEvent.date     = req.body.date
            newEvent.location = req.body.location
            newEvent.venue    = req.body.venue
            newEvent.price    = req.body.price
    
            newEvent.save()
    }
}